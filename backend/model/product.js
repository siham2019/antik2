const mongoose = require('mongoose');


const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the name of product"],
        maxLength:[100,"th max length of name is 100"]
    },
    price:{
        type:Number,
        required:[true,"please enter the price"],
        default:0.0,
    },
    description:{
        type:String,
        required:[true,"please enter the description"],
    },
    stock:{
        type:Number,
        required:true
    },
    stockStatus:{
        type:"string",
        required:true
    },
    image:[
      {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
      }
    ],
    category:{
         type:String,
         enum:[
             "beauty",
             "health",
             "shoes",
             "skirt",
             "pant",
             "accessory",
             "sport",
             "dress",
             "hat",
         ]
    },
   moy_rating:{
        type:Number,
        default:0.0,
    },
    number_reviews:{
        type:Number,
        default:0
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
     },
    review:[
        {
            rating:Number,
            comment:String,
            image:String,
            name:String,
            createdAt:{
               type:Date,
               default:Date.now(),
               required:true
            },
            uid:mongoose.Schema.Types.ObjectId
        }
    ]
})


module.exports= mongoose.model("Product",ProductSchema)
