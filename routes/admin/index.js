var express = require('express');
var quizzesRouter= require("./quiz")
var categoryRouter = require('./category')
var adminRouter = require('./admin')


var router = express.Router();


router.use('/quiz', quizzesRouter)
router.use('/category', categoryRouter)
router.use('/admin' , adminRouter )


module.exports = router;
