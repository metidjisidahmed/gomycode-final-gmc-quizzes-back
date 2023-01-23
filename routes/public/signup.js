var express = require('express');
var router = express.Router();
var userSchema = require('../../models/user.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendSuccessResponse, sendErrorResponse} = require("../../utils");

/* GET home page. */
router.post('/user', function(req, res, next) {
    bcrypt.hash(req.body.password  , 12)
        .then(hashedPassword=>{
            // createthe admin ( but with the hashed password instead of req.body.password
            return   userSchema.create({...req.body , password : hashedPassword})
        })
        .then(createdUser=>{
            const token = jwt.sign({ id : createdUser._id , isAdmin : false} , process.env.ACCESS_TOKEN_SECRET )
            sendSuccessResponse(res , 200, { account : createdUser , token :  token})
        })
        .catch(err=>{
            sendErrorResponse(res , 500 , err)
        })
});

module.exports = router;
