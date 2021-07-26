const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:4,
        max:10,
        unique:true
    },
    email:{
        type:String,
        require:true,
        max:30,
        unique:true
    },
    password:{
        type:String,
        min:6,
        require:true
    }
},
{timestamps:true})

module.exports = mongoose.model("User",userSchema);