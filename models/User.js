const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    whatsapp:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    qrCode: {
        type: Buffer,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;