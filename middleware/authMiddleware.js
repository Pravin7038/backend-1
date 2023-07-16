const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const user = require("../models/userModel")

const authMiddle = (req,res,next)=>{

    const {authorization} = req.headers;

    const token = authorization.split(" ")[1];

    jwt.verify(token,"pravin",(err,decoded)=>{

        console.log(decoded)
        if(decoded){

            req.userid = decoded.user_id;
            req.username = decoded.username;
            next();
        }
        else{

            res.send({"error":"something went wrong"})
        }
    })

    // if(token){

    //     next();

    //    }
    //    else{

    //     res.status(400).send({"error":"wrong credentials"})
    //    }
    

}

module.exports = authMiddle;