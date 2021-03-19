const ErrorHandler = require("../errors/ErrorHandler")
const order = require("../model/order")
const product = require("../model/product")
const stripe = require("stripe")("sk_test_51IHZTMGITsTpVqczpU17LgOwN34R3ZIBf8plfcagUllK5sRESJJrAvPlnwqu505XK77ImAwsdDEgNugPOAfkqA3w0031CtSSwE")

exports.createOrder=async(req,res,next)=>{
    try {
        stripe.paymentIntents.create({amount: req.body.amount*1000,
            payment_method:req.body.paymentInfo.id,
            currency: 'DZD'})
        
          await order.create({...req.body,userId:req.user._id})
            res.status(200).json({
                success:true,
                message:"order created"
            })

        } catch (error) {
           next(error)
    }
}

//get single order

exports.getOrder=async(req,res,next)=>{
    try {
         const ord=await order.findById(req.params.id)
         if(!ord) return next(new ErrorHandler("there is no order with that id ",404))
         
         res.status(200).json({
             success:true,
             order:ord
         })

    } catch (error) {
        next(error)
    }
}

//my orders

exports.myOrder=async(req,res,next)=>{
    try {
         const ord=await order.find({userId:req.user._id})
         
         res.status(200).json({
             success:true,
             order:ord
         })

    } catch (error) {
        next(error)

    }
}

// get all orders -> admin

exports.getAllOrder=async(req,res,next)=>{
   try {
    
    const ord=await order.find()
     
/*     const total=ord.reduce((a,o)=>o.totalPrice+a,0)
 */
    res.status(200).json({
        success:true,
        order:ord,
    })

   } catch (error) {

    next(error)

   }
}

// update order by admin

exports.updateOrder=async(req,res,next)=>{
    try {
        const ord=await order.findOne({_id:req.params.id})
        if(!ord) return next(new ErrorHandler("there is no order with that id user",404))
         
        if(!ord.deliverAt){
              ord.deliverAt=Date.now()
              ord.items.forEach(async(item) => {
                  
                  const prod=await product.findOne({_id:item.productId})
                  prod.stock=prod.stock-item.quantity
                  await prod.save()

              });

       
        }
        else{
            return next(new ErrorHandler("you already delivered this order",400))
        }
         ord.orderStatus=req.body.orderStatus
         await ord.save()

        res.status(200).json({
            success:true,
            message:"order updated"
        })
    } catch (error) {
        next(error)
    }
}

//remove order-> admin
exports.removeOrder=async(req,res,next)=>{
    try {
         const ord=await order.findById(req.params.id)
         
         if(!ord) return next(new ErrorHandler("there is no order with that id user",404))
         await ord.remove()

         res.status(200).json({
             success:true,
             message:"order removed"
         })

    } catch (error) {
        next(error)
    }
}