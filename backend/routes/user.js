const { getMeProfile, changePassword, updateProfile, getAllUser, removeUser, updateUser } = require('../controller/user')
const { isAuth, isAdmin } = require('../middleware/authorize')

const user=require('express').Router()


/* user.get("/profile/:id",isAuth,getProfile)
 */user.post("/me/profile",isAuth,getMeProfile)
user.post("/me/password/change",isAuth,changePassword)
user.post("/me/profile/update",isAuth,updateProfile)
user.get("/users",isAuth,isAdmin,getAllUser)
user.post("/user/delete/:id",isAuth,isAdmin,removeUser)
user.post("/user/update/:id",isAuth,isAdmin,updateUser)
module.exports=user