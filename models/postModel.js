const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    name:{type:String}
})

const Post = mongoose.model("post",userSchema);

module.exports= Post;