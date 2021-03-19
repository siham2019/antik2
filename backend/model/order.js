const mongoose = require('mongoose');


const OrderSchema=mongoose.Schema({
    shipingInfo:{
          adress:{
              type:String,
              required:true
          },
          city:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
        }},
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        items:[
            {
                name:{
                  type:String,
                  required:true
                },
                quantity:{
                    type:Number,
                    required:true,
                    default:0
                },
              image:{
                  
                          type:String,
                          required:true
                 
                   },
                   price:{
                     type:Number,
                     required:true,
                     default:0.0
                   },
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"product",
                    required:true
                }
                
            }],
            createdAt:{
                type:Date,
                required:true,
                default:Date.now
            },
            deliverAt:{
                type:Date,
            },
            orderStatus:{
                type:String,
                required:true,
                default:"proccessing"
            },
            payementInfo:{
                id:{
                    type:String,
                },
                status:{
                    type:String,
                }
            },
            paidAt:{
                type:Date,
                require:true,
                default:Date.now
            },
            totalPrice:{
                type:Number,
            }
        


})

module.exports= mongoose.model("Order",OrderSchema)
