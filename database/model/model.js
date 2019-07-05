const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Book = new Schema({
    name:String,
    description:String,
    author:String,
    userid:String,
    date:String,
    lastModification:String,
    votes:[{type:Schema.Types.ObjectId, ref:"votes"}]
});


var vote = new Schema({
    users:[{type:Schema.Types.ObjectId ,ref:"users"}],
    Book:{type:Schema.Types.ObjectId ,ref:"Book"},
    type:Number
})

const User = new Schema({
    _id:Schema.Types.ObjectId,
    user:String,
    password:String,
    vote:[{type:Schema.Types.ObjectId,ref:"votes"}]
})


const BookModel = mongoose.model("Book",Book);

const VotationModel = mongoose.model("votes",vote);

const UserModel = mongoose.model("users",User)

module.exports = {Book:BookModel,User:UserModel,Vote:VotationModel};



