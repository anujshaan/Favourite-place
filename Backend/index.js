const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./Server/Database/Connection');
const pinRoute = require('./Server/Routes/Pins');
const userRoute = require('./Server/Routes/Users');

const app = express();
dotenv.config({path:'config.env'})


app.use(express.json());

//middleware

//MongoDB connection
connectDB();

app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is up and running on http://localhost:${port}`);
})