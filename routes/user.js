const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", async(req, res)=>{
    try{
        let userresponse = req.body;
        User.create(userresponse);
        res.status(200).json(userresponse);
    } catch(error){
        res.status(500).json(error);
    }
})

router.get("/", async(req, res)=>{
    try{
        res.send("User route is working");
    } catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;