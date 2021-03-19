const ErrorHandler = require("../errors/ErrorHandler")
const user = require("../model/user")
const bcrypt = require('bcrypt');


exports.getMeProfile=async(req,res,next)=>{
    try {

         res.status(200).json({
            user:req.user}
        )
    } catch (error) {

        next(error)
    }
}

exports.changePassword=async(req,res,next)=>{
    try {
          const us=req.user.password;
        const r= await bcrypt.compare(req.body.olDpassword,us);
        if(!r){
            return next(new ErrorHandler("your old password is incorrect",400))
        }
           
        req.user.password=req.body.newPassword
        
        await req.user.save()
        
          res.status(200).json({
            success:true,
            message:"your password is changed"
        })

    } catch (error) {
        next(error)
    }
}
exports.updateProfile=async(req,res,next)=>{
     try {
         const info={
             name:req.body.name,
             email:req.body.email,
             image:{
                public_id:req.body. public_id,
                url:req.body.url
             }
         }
        
         await user.findByIdAndUpdate(req.user._id,info)

        res.status(200).json({
            success:true,
            message:"your profile information updated"
        }) 

     } catch (error) {
         next(error)
     }
}
exports.getAllUser=async(req,res,next)=>{
    try {
        const us=await user.find()

        res.status(200).json({
           user:us,
           success:true
        })

    } catch (error) {
        next(error)
    }
}
exports.removeUser=async(req,res,next)=>{
    try {
        
        const us= await user.findById(req.params.id)
         if(!us)
            return next(new ErrorHandler("user not found",404))
          await us.remove()
          
        res.status(200).json({
            success:true,
            message:"user removed"
        })

    } catch (error) {
        next(error)
    }
}

exports.updateUser=async(req,res,next)=>{
    try {
        const us=await user.findById(req.params.id)

        if(!us)
            return next(new ErrorHandler("user not found",404))
        
            await user.findByIdAndUpdate(req.params.id,{
              name:req.body.name,
              email:req.body.email,
              role:req.body.role
          })
          
        res.status(200).json({
            success:true,
            message:"user updated"
        })
          
    } catch (error) {
        next(error)
    }
}