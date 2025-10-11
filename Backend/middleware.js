const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken');
const authMiddleware = (req,res,next) =>{
    const autherHeader = req.headers.authorization;
    if(!autherHeader || !autherHeader.startsWith("Bearer")){
        return res.status(403).json({
            
        })
    }
    try{
        const token = autherHeader.split(" ")[1];
        const decode = jwt.verify(token,JWT_SECRET);
        res.userId = decode.userId;
        next();
    }catch(err){
        res.status(403).json({});
    }
}

module.exports = {
    authMiddleware
}