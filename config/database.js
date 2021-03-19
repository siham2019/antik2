const mongoose = require('mongoose');

const connection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
         useUnifiedTopology: true ,
         useNewUrlParser: true,
        })
    .then(()=>console.log("you are connected to db"))
}


module.exports=connection