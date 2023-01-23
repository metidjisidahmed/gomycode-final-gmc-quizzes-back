var express = require('express');
const adminSchema = require('../../models/admin.model')
const {sendSuccessResponse, sendErrorResponse} = require("../../utils");
var router = express.Router();
var bcrypt=require("bcrypt")
let jwt = require('jsonwebtoken')


// POST /admin/admin
router.route('/signup')
    .post( (req, res, next) =>{
        // hash the password
        bcrypt.hash(req.body.password  , 12)
            .then(hashedPassword=>{
                // createthe admin ( but with the hashed password instead of req.body.password
                return   adminSchema.create({...req.body , password : hashedPassword})
            })
            .then(createdAdmin=>{
                const token = jwt.sign({ id : createdAdmin._id , isAdmin : true} , process.env.ACCESS_TOKEN_SECRET )
                sendSuccessResponse(res , 200, { account : createdAdmin , token :  token})
            })
            .catch(err=>{
                sendErrorResponse(res , 500 , err)
            })
    } )



module.exports = router;
