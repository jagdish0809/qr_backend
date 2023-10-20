const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Connection = require("./database/db");
const dotenv = require("dotenv");
const sendWhatsapp = require("./utils/sendWhatsapp");
const user = require("./routes/user");
const scanuser = require("./routes/scanuser");
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const PORT = process.env.PORT;

Connection();
// sendWhatsapp();

app.get('/', async(req, res) => {
    try{
        res.status(200).json("Server Is running");
    } catch(error){
        res.status(500).json(error);
    }
}) 

//Routes
app.use("/api/user", user);
app.use("/api/scanuser", scanuser);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})