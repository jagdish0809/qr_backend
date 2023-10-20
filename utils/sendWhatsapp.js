const { Client, MessageMedia, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const Whatsapp = require("../models/Whatsapp");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const sendWhatsapp = async () => {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ["--no-sandbox"] },
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("QR RECEIVED", qr);
    console.log("Scan the QR code to login");
  });

  client.on("ready", async () => {
    console.log("Client is ready!");
    setInterval(async () => {
      const data = await Whatsapp.findOne();

      if (data) {
        const number = data.whatsapp;
        const base64Image = data.qrCode.toString("base64");
        const media = new MessageMedia("image/png", base64Image, "QR Code");
        const caption = "Here is your QR Code";
        try {
          await client.sendMessage(number, media, { caption: caption });
          console.log("Message sent successfully to ", number);
          await Whatsapp.deleteOne().then(console.log(number ," Deleted"));
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }else{
        console.log("No data found");
      }
    }, 35000);
  });

  client.initialize();
};

module.exports = sendWhatsapp;
