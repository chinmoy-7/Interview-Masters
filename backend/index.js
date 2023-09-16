const express = require("express")
const dotenv = require("dotenv")
const connect = require("./DB/connect");
const router = require("./Routes/route");
const cors = require("cors")
const PORT  = process.env.PORT||4000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(router)


app.listen(PORT,async ()=>{
    await connect();
    console.log("Server is up",PORT);
})