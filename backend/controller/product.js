const ErrorHandler = require('../errors/ErrorHandler');
const product = require('../model/product');
const Product = require('../model/product');
const Features = require('../More/features');


const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dzdwsvodc",
  api_key: "592926298862529",
  api_secret: "XS-1g399cm6ZiTC8bTP3Ghqpdds",
}); 








exports.createProduct=async(req,res,next)=>{

   try {
     req.body.userId=req.user._id
    const product= await Product.findOne({name:req.body.name,image:req.body.image})
  

    if(product) return next(new ErrorHandler("this product exists",400))
    else{
     await Product.create({...req.body,stockStatus:req.body.stock>0?"in stock":"out stock"})
     
      res.status(200).json({
        message:"the product is added",
        success:true
      })
  }
   } catch (error) {
     next(error)
   }

}

exports.getAllProduct=async(req,res,next)=>{
       
    try {
          const limit= req.body.page
          let f=  new Features( Product.find(),req.query).search().filter()
          
          let product = await f.query 
          const count=product.length
            
       
          f=f.page(limit)

          product = await f.query 
          
          let r=await Product.find().sort({price:1})
          
          setTimeout(() => {
      
            res.status(200).json({
             product:product,
             maxPrice:r.length>0?r[0].price:0,
             minPrice:r.length>0?r[r.length-1].price:0,
             count:count,
             success:true
           })
  
          }, 1000);
    } catch (error) {
      next(error)
    }


}

exports.getByIdProduct=async(req,res,next)=>{
      try {
        const product=await Product.findById(req.params.id)
        if(!product) next(new ErrorHandler("product not found",404))
          
       res.status(200).json({
         product:product,
         success:true
       }) 
      } catch (error) {
        next(error)
      }
}

exports.updateProduct=async(req,res,next)=>{
    try {
      const product=await Product.findById(req.params.id)

      if(!product) next(new ErrorHandler("product not found",404))

       await Product.findByIdAndUpdate(req.params.id,{...req.body})
    
       res.status(200).json({
              success:true,
              messag:"updated"
       })
    } catch (error) {
      next(error)
    }


}

exports.deleteProduct=async(req,res,next)=>{
    try {
      const product=await Product.findOne({_id:req.params.id})
        
      if(!product) next(new ErrorHandler("product not found",404))
       await Product.findByIdAndRemove(req.params.id)
       product.image.map(async(e)=>{
        
       await cloudinary.uploader.destroy(e.public_id);
      })

      const products=await Product.find({})
      
      res.status(200).json({
              success:true,
              product:products,
              messag:"deleted"
       })

    } catch (error) {
      next(error)
    }

    

}

exports.deleteAll=async(req,res,next)=>{

     try {
      await Product.deleteMany()
       
      res.status(200).json({
             success:true,
             messag:"deleted all"
      })
     } catch (error) {
       next(error)
     }

    

}

//********************** product reviews **********************************

//create or update review by user

exports.createReviews=async(req,res,next)=>{
   try {

        const prod=await product.findById(req.params.id)

        if(!prod) return next(new ErrorHandler("product not found ",404))
        
        const isReviewed=prod.review.find(r=>r.uid.toString()===req.user._id.toString())
        if(isReviewed){

          isReviewed.rating=req.body.rating
          isReviewed.comment=req.body.comment

          await isReviewed.save({ suppressWarning: true })

        }else{

          const reviews={
            uid:req.user._id,
            name:req.user.name,
            image:req.user.image.url,
            rating:req.body.rating,
            comment:req.body.comment
          }
          
          prod.review.push(reviews)
          prod.number_reviews=prod.review.length
      
        }
        prod.moy_rating=prod.review.reduce((v,r)=>v+r.rating,0)/prod.number_reviews
        await prod.save()
        
      
        res.status(200).json({
          success:true,
          message:"review created"
        })

      } catch (error) {
          next(error)
   }
}

exports.getReviews=async(req,res,next)=>{
  try {
    const prod=await product.findById(req.params.id)
    if(!prod) return next(new ErrorHandler("there is no product with that is",404))
    
    res.status(200).json({
      success:true,
      review:prod.review,
      number_reviews:prod.number_reviews
    })

  } catch (error) {
    next(error)
  }
}

exports.deleteReviews=async(req,res,next)=>{
  try {
    const prod=await product.findById(req.query.pid)
    if(!prod) return next(new ErrorHandler("there is no product with that is",404))
     
    const pro=prod.review.filter(r=> r._id.toString()!==req.query.idr)
     
     prod.review=pro
      
     prod.number_reviews=  prod.review.length

     if(pro.number_reviews>0)
       prod.moy_rating=prod.review.reduce((v,r)=>v+r.rating,0)/prod.number_reviews
    else
      prod.moy_rating=0

     await prod.save() 
     
     res.status(200).json({
        success:true,
        message:"review deleted"
     })

    } catch (error) {
    next(error)
  }
}