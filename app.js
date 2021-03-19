const express = require('express');
const { errors } = require('./backend/middleware/errors');
const auth = require('./backend/routes/auth');
const app = express();
const product=require("./backend/routes/product")
const cookieParser = require('cookie-parser');
const user = require('./backend/routes/user');
const order = require('./backend/routes/order');
const cors = require('cors');

app.use(express.json())
app.use(cookieParser());
app.use(cors())

app.use('/api', product)
app.use('/api', auth)
app.use("/api",order)
app.use('/api', user)
app.use(errors)

module.exports=app