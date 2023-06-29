// require('dotenv').config()
const userRouter = require('./Api/Router/userrouter');
 const loginRouter = require('../controller/Api/Router/loginRouter') 
const connectDB = require('./Database/db');
const express = require('express');
const cors = require('cors');
const app = express();


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

connectDB();
app.use('/user', userRouter);
app.use('/api/login',loginRouter)



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log('server is running'); })