var express = require('express');
var quizRoute = require('./quiz')


var router = express.Router();

// login admin + login user
router.use('/quiz', quizRoute)

module.exports = router;


