var express = require('express');
var router = express.Router();
var categorySchema = require('../../models/category.model')
const {sendSuccessResponse, sendErrorResponse} = require("../../utils");
const quizSchema = require('../../models/quiz.model')

// get all categories
router.get('/all', function(req, res, next) {
    categorySchema.find({})
        .then(categories=>{
            sendSuccessResponse(res , 200 , categories)
        })
        .catch(err=>{
            sendErrorResponse(res , 500 , err)
        })
});

router.get('/:categoryID/quizzes' , (req, res, next) => {
    let categoryId = req.params.categoryID
    console.log("category ID =", categoryId)
    quizSchema.find({categoryID : categoryId})
        .then(quizzes=>{
            sendSuccessResponse(res , 200 , quizzes)
        })
        .catch(err=>{
            sendErrorResponse(res , 500 , err)
        })
})

module.exports = router;
