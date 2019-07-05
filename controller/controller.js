const mongoose = require("mongoose");
const { Book, User } = require("../database/model/model");


const controller = {
    //Get
     getBook: {
         get: (req, res) => Book.find().then(d => res.send(d.reverse())),

         filter: (req, res) => {
             const { id } = req.params;
             Book.find({ "userid": id }).then(r => res.send(r.reverse()));
         },

         filterOne: (req, res) => {
             const { id, bookid } = req.params;
             Book.find({ "_id": bookid, "userid": id }).then(r => res.send(r));
         }
     },

     login: async (req, res) => {
         let { user, password } = req.body;
         let us = await User.findOne({ user, password });
         res.send(us);
     },

     adduser: async (req, res) => {
         const { user, password } = req.body;
         let us = await new User({ _id: new mongoose.Types.ObjectId(), user, password });
         us.save().then(r => res.send(r))
     },

     getOnUser: (req, res) => {
         let { user } = req.params;
         User.findOne({ user }).then(r => res.send(r))
     },

     //Remove 
     remove: (req, res) => {
         const { id } = req.params;
         Book.findByIdAndDelete(id).then(r => res.send(r))
     },

     //Update 
     modify: (req, res) => {
         const { id, bookid } = req.params;
         const { name, description, author } = req.body
         Book.findOneAndUpdate({ "_id": bookid, "userid": id }, { name, description, author, lastModification: new Date().toISOString() })
         .then(r => res.send(r));
     }
}

module.exports = controller;