// server set-up file.
// we are using import key for import our package so you have add one line in package.json file before "scripts".
// That line"type" : "module".

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";   // import route from the routes file.


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT || 7000; //import port from the .env
const URL = process.env.MONGOURL;


mongoose.connect(URL)
.then(()=>{
    console.log("Data Base Connected Successfully...");
})
.catch((error)=>{
    console.log(error)
})

app.listen(PORT,()=>{
    console.log(`Server is Running on port : ${PORT}`);
})


app.use("/api",route)    //import route.