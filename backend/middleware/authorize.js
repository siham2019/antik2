const jwt = require("jsonwebtoken");
const ErrorHandler = require("../errors/ErrorHandler");
const user = require('../model/user');

exports.isAuth=async (req,res,next)=>{
     try {
          const token=req.body.token;
          
            if(!token){
               return next(new ErrorHandler("please login",401))
               }

           const payload=await jwt.verify(token,process.env.KEY_JWT)
         
           const k=await user.findById(payload.data)
           
           if(!k){
               return next(new ErrorHandler("user not found",404))
           }

           req.user=k
           next()
           
     } catch (error) {
          res.send({err:error})
     }


}

exports.isAdmin=(req,res,next)=>{
     if(req.user.role==="admin")
          next()

      else
      next(new ErrorHandler("you can't access to this url",403))

     }