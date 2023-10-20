const mongoose = require("mongoose");

const WhatsappSchema = new mongoose.Schema({
  whatsapp: {
    type: String,
    required: true,
  },
  qrCode: {
    type: Buffer,
    required: true,
  }
});

const Whatsapp = mongoose.model("Whatsapp", WhatsappSchema);

module.exports = Whatsapp;