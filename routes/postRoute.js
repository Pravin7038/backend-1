const express = require("express");
const Post = require("../models/postModel")
const route = express.Router()
const authMiddle = require("../middleware/authMiddleware")

route.post("/add", authMiddle, async (req, res) => {
    try {

        const post = await Post.create({ ...req.body, creator: req.userid, name: req.username });
        await post.populate("creator")
        res.send(post)


    } catch (error) {
        res.send({ "msg": "error" })
    }
})

route.get("/get", async (req, res) => {

    try {


        const post = await Post.findOne({ title: req.query.title });
        console.log(post)
        res.send({ "msg": post })

    } catch (error) {
        res.send({ "msg": "error" })
    }
})

route.delete("/delete/:id", authMiddle, async (req, res) => {


    try {

        const post = await Post.findOne({ _id: req.params.id });

        if (post.creator.toString() === req.userid) {

            await Post.findOneAndDelete({ _id: req.params.id });

            res.send("deleted");

        }
        else{

            res.send("You are not admin of the post");

        }




    } catch (error) {

        res.send({ "msg": "error" })

    }
})



route.patch("/update/:id", authMiddle, async(req,res) => {


    try {

        const post = await Post.findOne({ _id: req.params.id });

        if (post.creator.toString() === req.userid) {

            await Post.findByIdAndUpdate({ _id: req.params.id },req.body)

            res.send("updated");

        }
        else{

            res.send("You are not admin of the post");

        }



    } catch (error) {

        res.send({ "msg": "error" })

    }
})

module.exports = route