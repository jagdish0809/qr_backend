const express = require("express");
const User = require("../models/User");
const Whatsapp = require("../models/Whatsapp");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.post("/", upload.single("qrCode"), async (req, res) => {
  try {
    const { name, email, whatsapp, company } = req.body;
    const user = User.findOne({ email });
    console.log(user, "user")
    if (user) {
      return res.status(400).json("User already exists");
    } else {
      await Whatsapp.create({
        whatsapp: `91${whatsapp}@c.us`,
        qrCode: req.file.buffer,
      });
      await User.create({
        name,
        email,
        whatsapp,
        company,
        qrCode: req.file.buffer,
      });
      const attachment = [
        {
          filename: "qrCode.png",
          content: req.file.buffer,
        },
      ];
      await sendEmail(
        email,
        `${name} this is your QR code for the Event`,
        attachment
      );
      res.status(200).json("User created successfully");
    }
  } catch (error) {
    res.status(500).json("user not created");
  }
});

router.get("/", async (req, res) => {
  try {
    res.send("User route is working");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
