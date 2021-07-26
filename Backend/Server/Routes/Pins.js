const router = require('express').Router();

const Pin = require('../Modals/Pin');

//create a pin
router.post("/",async (req,res)=>{
    const newPin = new Pin(req.body);
    try{
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }catch(e){
        res.status(500).json(e);
    }
})


//get all pin
router.get("/",async(req,res)=>{
    try{
        const allPin = await Pin.find();
        res.status(200).json(allPin);
    }catch(e){
        res.status(500).json(e);
    }
})


module.exports = router;