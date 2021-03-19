const dotenv = require('dotenv');
const app = require('./app');
const port = process.env.PORT || 8000;
const connection= require('./config/database');

dotenv.config({path:"./config/config.env"})

process.on("uncaughtException",(err)=>{
   console.log(err.message)
    process.exit(1)
})
 
process.on("unhandledRejection",(err)=>{
    console.log(err.message)
    process.exit(1)
})

connection()


app.listen(port, () => console.log(`Example app ${process.env.NODE_ENV}`))