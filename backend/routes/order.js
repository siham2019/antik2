const { createOrder, getOrder, myOrder, updateOrder, getAllOrder, removeOrder } = require('../controller/order')
const { isAuth, isAdmin } = require('../middleware/authorize')

const order=require('express').Router()
 
order.post('/order/create',isAuth,createOrder)

order.post('/order/me',isAuth,myOrder)
order.post('/order/all',isAuth,isAdmin,getAllOrder)
order.post('/order/remove/:id',isAuth,isAdmin,removeOrder)
order.post('/order/:id',isAuth,getOrder)

order.post('/order/update/:id',isAuth,isAdmin,updateOrder)

module.exports=order