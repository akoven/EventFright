const express = require('express');
const asyncHandler = require('express-async-handler');
const {setTokenCookie, requireAuth} = require('../../utils/auth');
const {User} = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateEvent = [

]
