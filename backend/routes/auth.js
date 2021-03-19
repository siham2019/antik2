const { register, login, logout, forgetPassword, resetPassword } = require('../controller/auth')

const auth=require('express').Router()


auth.post("/register",register)
auth.post("/login",login)
auth.get("/logout",logout)
auth.post("/forget",forgetPassword)
auth.post("/reset/",resetPassword)

module.exports=auth