
const jwt = require("jsonwebtoken");
const env = require('dotenv').config()

const ensureauthenticated=(req,res,next)=>{
   const token = req.headers['authorization'] ;
 
   if (!token){
    return res.status(403).json({massage:"unauthorized request,jwt token is required"})
   }
   try {
      
    const decoded= jwt.verify(token,process.env.JWT_SECRET);
 
    req.user= decoded;
    console.log(req.user)

    next();

    
   } catch (error) {
    return res.status(403).json({message:"unauthrized "})
    
   }
}
module.exports= ensureauthenticated;