const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../Modals/User');


//create a new user
router.post("/register",async (req,res)=>{
    try{
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPass,
    });
    
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch(e){
        res.status(500).json(e);
    }
})

//Login
router.post("/login",async(req,res)=>{
    try{
        //match login username
        const user = await User.findOne({username:req.body.username});
        !user && res.status(400).json("Wrong login credential");

        //match login password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password");

        //display user data
        res.status(200).json({_id:user._id, username:user.username});
    }catch(e){
        res.status(500).json(e);
    }
})


module.exports = router;