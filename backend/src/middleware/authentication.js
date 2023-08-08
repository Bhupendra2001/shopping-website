const jwt = require('jsonwebtoken')

const Authentication = (req,res, next)=>{
    const authHeader = req.headers.token;
    //console.log(authHeader)
    if(authHeader){
        const token = authHeader.split('  ')[1];
       // console.log(token)
        jwt.verify(token , process.env.JWT_SEC , (err, user)=>{
            if(err) return res.status(403).json("Token is not valid");
            req.user = user;
            next();
        })
    }else {
        return res.status(401).json("You are not authenticated!");
    }
}

const Authorization = (req,res,next)=>{

    Authentication(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("You are not alowed to do that!");
        }
    });

};

const CheckAdmin = (req, res, next) =>{
    Authentication(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("you are not alowed to do that!");
        }
    })
}

module.exports = { Authentication , Authorization , CheckAdmin}