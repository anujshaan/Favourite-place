const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.DATA_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        })
        console.log(`Database connected: ${conn.connection.host}`);
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}
module.exports = connectDB;