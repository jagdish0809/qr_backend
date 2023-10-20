const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", async(req, res)=>{
    try{
        const scanemail = req.body.email;
        const user = await User.findOne({email: scanemail});
        if(user){
            res.status(200).json({validation: user.name});
        } else{
            res.status(200).json({validation: "Invalid User"});
        }
    } catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;