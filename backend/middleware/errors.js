const ErrorHandler = require("../errors/ErrorHandler")

exports.errors=(err,req,res,next)=>{
    console.log(err);

if (process.env.NODE_ENV.trim()==='DEVELOPEMENT') {
    res.status(err.status || 500).json({
        err1:err.stack,
        err:{...err},
        success:false
    })
} 

if(process.env.NODE_ENV.trim()==='PRODUCTION')
{
    if(err.name==="CastError")
       err=new ErrorHandler(`ressource not found invalid ${err.path}`,404)
    if(err.name==="ValidationError")
    err=new ErrorHandler(` ${err.message} validation error `,400)

    
      res.status(err.status || 500).json({
        message:err.message || "internal error server",
        success:false
    })
}

}