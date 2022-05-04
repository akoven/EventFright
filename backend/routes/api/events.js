const express = require('express');
const asyncHandler = require('express-async-handler');
// const {setTokenCookie, requireAuth} = require('../../utils/auth');
const {Event} = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateEvent = [
    check('name')
        .exists({checkFalsy: true})
        .withMessage('Please provide a name for your event.'),
    check('date')
        .exists({checkFalsy: true})
        .withMessage('Please provide a date for your event.'),
    check('capacity')
        .exists({checkFalsy: true})
        .withMessage('What is the maximum capacity for your event.'),
    handleValidationErrors
];

router.post(
    '/', validateEvent,asyncHandler(async(req,res) => {
        const {hostId,name,date,capacity} =req.body;
        const event = await Event.create({hostId,name,date,capacity});

        return res.json({
            event
        });

    })
);

router.get('/', asyncHandler(async(req,res) => {
    const getEvents = await Event.findAll();
    return res.json(getEvents);
}));

module.exports = router;
