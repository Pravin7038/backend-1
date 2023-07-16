const express = require("express");
const user = require("../models/userModel")
const route = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
route.get("/logout", (req, res) => {

    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];
    if (!token) {
        res.send("Login First")
    }
    else {

        blacklist.push(token);

        res.send({ "msg": "User has been logged out" })

    }


})


route.post("/login", async (req, res) => {

    const { email, password } = req.body
    try {
        const User = await user.findOne({ email});

        if (User) {
            const verify = await bcrypt.compare(password, User.password)
            console.log(verify)
            if (verify) {

                const token = jwt.sign({ user_id : User._id , username:User.name }, "pravin", { expiresIn: "1d" });
                res.status(200).send({ "msg": "Login successfull", "token": token })
            }
            else {

                res.status(400).send({ "error": "wrong credentials" })
            }

        }
        else{

            res.send("error")
        }


    } catch (error) {

        res.status(400).send(error)
    }
})

// {
//     "name": "ttstgsr",
//     "email": "sdggdfgs",
//     "password": "sdggdfgs",
//     "city": "sdfg",
//     "age": 56
//   }

route.post("/register", async (req, res) => {
    const { name, email, password, city, age } = req.body;

    try {
        const User = await user.findOne({ email })
        const newpass = await bcrypt.hash(password, 10)
        if (User === null) {
            user.create({ ...req.body, password: newpass });

            res.status(200).send({ "msg": "The new user has been registered", "registeredUser": req.body })

        }

        else {

            res.send({ "msg": "The user Already exist" })
        }


    }
    catch (error) {

        res.status(400).send({ "error": error })
    }
})

module.exports = route