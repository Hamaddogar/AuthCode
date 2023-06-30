// require('dotenv').config()



const express = require('express');
const cors = require('cors');
const app = express();

const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const connectDB = require('../controller/Database/db'); // Import your database connection file

const UserForgot = require('../controller/Database/model/forgotModel'); // Import the forgotModel file

// Add any additional imports you might have
const userRouter = require('../controller/Api/Router/userRouter');
const loginRouter = require('../controller/Api/Router/loginRouter');
const Form = require('../controller/Database/model/formModel');
const forgetRouter = require('../controller/Api/Router/forgetRouter')
 const resetRouter = require('../controller/Api/Router/resetRouter')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

connectDB();
app.use('/user', userRouter);
app.use('/api/login', loginRouter)
app.use('/user', userRouter);
app.use('/forgot',forgetRouter)

app.use('/resetpassword', resetRouter);





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log('server is running'); })