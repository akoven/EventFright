const express = require('express');
const asyncHandler = require('express-async-handler');
const {setTokenCookie, requireAuth} = require('../../utils/auth');
const {User} = require('../../db/models');
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
    '/', validateEvent,asyncHandler(async(req,res,next) => {
    })
);
