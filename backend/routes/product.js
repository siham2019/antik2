const { createProduct, getAllProduct, getByIdProduct, updateProduct, deleteProduct, deleteAll, createReviews, getReviews, deleteReviews } = require('../controller/product')
const { isAuth, isAdmin } = require('../middleware/authorize')

const product=require('express').Router()
 

product.post("/product/new",isAuth,isAdmin,createProduct)

product.post("/product/all",getAllProduct)

product.get("/product/:id",getByIdProduct)
product.post("/product/review/delete/",isAuth,isAdmin,deleteReviews)

product.post("/product/review/:id",isAuth,createReviews)
product.get("/product/review/:id",getReviews)


product.post("/product/update/:id",isAuth,isAdmin,updateProduct)

product.post("/product/delete/all",isAuth,isAdmin,deleteAll)

product.post("/product/delete/:id",isAuth,isAdmin,deleteProduct)

module.exports=product