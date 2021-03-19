const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcrypt');

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the name"],
        maxLength:[40,"max length is 40 charecters"]
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        validate:[validator.isEmail,"incorrect email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        minlength:[8,"the password should be at least 8 charecters"]
    },
    image:{
        public_id:{
            type:String,
         
        },
        url:{
            type:String,
            required:true,
            default:"https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png"
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    tokenResetPassword:{
        type:String,

    },
    tokenExpire:{
        type:Date,

    }
})

UserSchema.pre("save",function(next){
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bycrypt.hashSync(this.password, 10);
    next();
})

module.exports= mongoose.model("User",UserSchema)