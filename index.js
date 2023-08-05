const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Connection = require("./database/db");
const dotenv = require("dotenv");
const user = require("./routes/user");

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const PORT = process.env.PORT;

Connection();

app.get('/', async(req, res) => {
    res.send("Event Qr app is working");
})

//Routes
app.use("/api/user", user);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})