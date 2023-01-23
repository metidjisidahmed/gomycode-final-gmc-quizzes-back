var express = require('express');
var router = express.Router();
var answerSchema = require('../../models/answer.model')
const {sendSuccessResponse, sendErrorResponse} = require("../../utils");

/* GET home page. */
router.post('/submit-answer', function(req, res, next) {
    answerSchema.create({...req.body , userID : req.user.id})
        .then(answer=>{
            sendSuccessResponse(res , 200 , answer)
        })
        .catch(err=>{
            sendErrorResponse(res , 500 , err)
        })
});

module.exports = router;
