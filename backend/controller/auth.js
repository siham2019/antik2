const ErrorHandler = require("../errors/ErrorHandler")
const user = require("../model/user")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { send } = require("../More/email");


exports.register=async(req,res,next)=>{
       try {
        const u=await user.findOne({email:req.body.email})
        if(u) return next(new ErrorHandler("user exists",400))
           
    

         await user.create({...req.body})
       
         res.status(200).json({
             success:true,
             message:"registered!"
         })

       } catch (error) {
           next(error)
       }
}

exports.login=async(req,res,next)=>{
    try {

         if(!req.body.email || !req.body.password){
            return next(new ErrorHandler("please enter email and password",400))
         }


        const us=await user.findOne({email:req.body.email})
          if(!us){
              return next(new ErrorHandler("your email is incorrect",400))
          }
          
          
          const r= await bcrypt.compare(req.body.password,us.password);
          if(!r){
              return next(new ErrorHandler("your password is incorrect",400))
          }


          const token= await jwt.sign({data: us._id}, process.env.KEY_JWT, { expiresIn:"7d" });
          
          res.status(200).json({
            success:true,
            token:token,
            role:us.role
        })
        } catch (error) {
           next(error);
    }
}

exports.forgetPassword=async(req,res,next)=>{
    
     try {
         
        const us=await user.findOne({email:req.body.email})
        if(!us){
            return next(new ErrorHandler("user not found",404))
        }
        const y=  crypto.randomBytes(32).toString('hex')
        const token = await bcrypt.hash( y ,10) 
        await  user.findByIdAndUpdate(us._id,{ tokenResetPassword:token,tokenExpire:new Date(Date.now()+30*60*60)},
        {
            useFindAndModify:false
        }
        )
      
        const message=`here is the url for reset your password
                           ${req.protocol}://${req.get('host')}/api/reset/?token=${y}&id=${us._id}`;

         send({
            userEmail:us.email,
            subject:"reset password",
            message:message
         })

          res.status(200).json({
           success:true,
           message:"sended"
          })
       
     } catch (error) {
      next(error)   
     }

}
exports.resetPassword=async(req,res,next)=>{
    try {
        const ctoken=await user.findById(req.query.id)
        const token = await bcrypt.compare( req.query.token ,ctoken.tokenResetPassword) 
         if(!token)
          return next(new ErrorHandler("invalid token",400))

           const us=await user.findOne({_id:req.query.id,tokenExpire:{$gte:new Date(Date.now())}})
  
           if(!us) return next(new ErrorHandler("expired user token",404))

           if(!req.body.password && !req.body.confirmedPassword){
            return next(new ErrorHandler("please enter the confirmed password and the password",400))
        }
           if(req.body.password!==req.body.confirmedPassword){
               return next(new ErrorHandler("the confirmed password should match the password",400))
           }

           us.tokenResetPassword=null
           us.tokenExpire=null
           us.password=req.body.password
           
           await us.save({
               validateBeforeSave:true
           })

           res.status(200).json({
               success:true,
               message:"password updated"
           })

    } catch (error) {
       next(error) 
    }
}

exports.logout=(req,res,next)=>{

       res.status(200).cookie("token",null,{
           expires:new Date(Date.now()),
           httpOnly:true
       }).json({
           success:true,
           message:"logout"
       })


}