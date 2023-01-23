const jwt = require('jsonwebtoken')


function sendSuccessResponse(res , statusCode , data){
    res.status(statusCode).json({success : true , err : null , data : data})
}
function sendErrorResponse(res , statusCode , err){
    res.status(500).json({success : false , err : err.message , data : null})
}

function authentificateTokenAdmin(req , res , next){
    let bearerPlusToken = req.headers['authorization']
    let token=null;
    if(bearerPlusToken!= null){
        token = bearerPlusToken.split(' ')[1]
    }
    if(token != null){
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
            //admin = {id : , isAdmin : true}
            console.log("Token content =", user)
            if(err){
                res.setHeader('Content-Types', 'application/json');
                res.statusCode = 403;
                res.json({status : false , err: 'Unauthenticated !'})
            }else if(!user.isAdmin){
                res.setHeader('Content-Types', 'application/json');
                res.statusCode = 403;
                res.json({status : false , err: 'You have to be admin to do this operation'})
            }else{
                req.user = user;
                next();

            }
        })
    }else{
        // res.sendStatus(401)
        res.statusCode = 401;

        res.json({ success : false , err : "unauthenticated" , data : null})
    }

}


function authentificateTokenUser(req , res , next){
    let bearerPlusToken = req.headers['authorization']
    let token=null;
    if(bearerPlusToken!= null){
        token = bearerPlusToken.split(' ')[1]
    }
    if(token != null){
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
            //admin = {id : , isAdmin : true}
            if(err){
                res.setHeader('Content-Types', 'application/json');
                res.statusCode = 403;
                res.json({status : false , err: 'Unauthenticated !'})
            }else if(user.isAdmin){
                res.setHeader('Content-Types', 'application/json');
                res.statusCode = 403;
                res.json({status : false , err: 'You have to be user to do this operation'})
            }else{
                req.user = user;
                next();

            }
        })
    }else{
        // res.sendStatus(401)
        res.statusCode = 401;

        res.json({ success : false , err : "unauthenticated" , data : null})
    }

}

module.exports= {
    sendSuccessResponse : sendSuccessResponse,
    sendErrorResponse : sendErrorResponse,
    authentificateTokenUser : authentificateTokenUser,
    authentificateTokenAdmin : authentificateTokenAdmin
}
