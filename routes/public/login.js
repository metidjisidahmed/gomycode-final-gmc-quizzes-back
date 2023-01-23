var express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



var router = express.Router();
var adminSchema = require('../../models/admin.model')
var userSchema = require('../../models/user.model')


router.post('/admin', (req, res, next) =>{
            const {email , password} = req.body
            let global_foundAdmin
            console.log("email =", email)
            adminSchema.findOne({ mail  : email})
                .then(foundAdmin=>{
                    global_foundAdmin = foundAdmin
                    console.log("Admin =", foundAdmin)
                    // delete global_foundStudent.password
                    // confirm that we have already a CREATED student with this mail
                    if(global_foundAdmin != null){
                        return bcrypt.compare(password ,global_foundAdmin.password )
                    }else{
                        // go to catch
                        throw new Error("unexisted user with this mail , please signup ")
                    }
                })
                .then(bool=>{
                    //  he writes the correct password
                    if(bool===true){
                        console.log("ACCESS_TOKEN_SECRET = " ,process.env.ACCESS_TOKEN_SECRET )
                        const token = jwt.sign( {id : global_foundAdmin._id , isAdmin : true }, process.env.ACCESS_TOKEN_SECRET)
                        res.json({ success : true , err : null , data : { account : global_foundAdmin , token: token} } )
                    }else{
                        // go to catch
                        // res.sendStatus(400)
                        res.statusCode = 400;

                        throw new Error("wrong password")
                    }
                })

                .catch(err=>{
                    // res.sendStatus(500)
                    res.statusCode = 500;

                    res.json({ success : false,  err : err.message , data : null})

                })

        }
);

router.post('/user', (req, res, next) =>{
        const {email , password} = req.body
        let global_foundUser

        userSchema.findOne({mail  : email})
            .then(foundUser=>{
                global_foundUser = foundUser
                // delete global_foundStudent.password
                // confirm that we have already a CREATED student with this mail
                if(global_foundUser != null){
                    return bcrypt.compare(password ,global_foundUser.password )
                }else{
                    // go to catch
                    throw new Error("unexisted user with this mail , please signup ")
                }
            })
            .then(bool=>{
                //  he writes the correct password
                if(bool===true){
                    console.log("ACCESS_TOKEN_SECRET = " ,process.env.ACCESS_TOKEN_SECRET )
                    const token = jwt.sign( {id : global_foundUser._id , isAdmin : false }, process.env.ACCESS_TOKEN_SECRET)
                    res.json({ success : true , err : null , data : { account : global_foundUser , token : token}})
                }else{
                    // go to catch
                    // res.sendStatus(400)
                    res.statusCode = 400;

                    throw new Error("wrong password")
                }
            })

            .catch(err=>{
                // res.sendStatus(500)
                res.statusCode = 500;

                res.json({ success : false,  err : err.message , data : null})

            })

    }
);
/* GET home page. */
// router.post('/user', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });

module.exports = router;
