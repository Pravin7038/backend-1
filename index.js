const express = require("express");
const app = express();
const mongoose = require("mongoose")
const user = require("./models/userModel")
const Post = require("./models/postModel")
require("dotenv").config()
app.use(express.json());
const cors = require('cors');
const blacklist = require("./blacklist")
const jwt = require("jsonwebtoken")

app.use(cors({ origin: 'http://localhost:3000' }));
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")
app.get("/",(req,res)=>{

    res.send("welcome");
})

app.use("/users",userRoute)

app.use("/posts",postRoute)


const connect = async()=>{

    try {
        
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected")

    } catch (error) {
        
        console.log(error)
    }
}
app.listen(process.env.PORT,()=>{

    connect();

    console.log("listen")
})

module.exports = app