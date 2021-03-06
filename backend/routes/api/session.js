const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {setTokenCookie, restoreUser} = require('../../utils/auth');
const {User} = require('../../db/models');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');

const validateLogin = [
    check('credentials')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('Please provide a valid email or username'),
    check('password')
        .exists({checkFalsy: true})
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

router.post(
    '/', validateLogin,asyncHandler(async(req,res,next) => {
        const {credentials, password} = req.body;
        const user = await User.login({credentials,password});

        if(!user){
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res,user);

        return res.json({
            user
        });
    })
);

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({message: 'success'});
});

router.get('/', restoreUser, (req,res) => {
    // console.log('made it to resoreUser')
    const{user} = req;
    // console.log(user)
    if(user){
        return res.json({
            user: user.toSafeObject()
        });
    }else return res.json({});
});


module.exports = router;
