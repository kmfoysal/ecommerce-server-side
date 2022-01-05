const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token;

    if(authHeader){
        jwt.verify(token, process.env.JWT_SECRET, (req, res)=>{
            if(err) res.status(403).json('Token Is not valid');
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json('You are not authenticated !');
    }
}

module.exports = {verifyToken}