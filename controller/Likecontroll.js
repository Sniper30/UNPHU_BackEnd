const mongoose = require("mongoose");
const { Book, User, Vote } = require("../database/model/model");

const express = require('express');
const router = express.Router();
const Postcontroll = {
    //Post
    vote: async (req, res) => {

        const { name, description, author, userid } = req.body;
        let book = new Book({
            name,
            description,
            author,
            userid,
            date: new Date().toISOString(),
            lastModification: null
        });
        book.save((err, doc) => {
            const vote = new Vote({
                users: [],
                Book: book._id,
                type: 0
            })
            vote.save(err => {
                if (err) res.send("hay un error con vote");

                res.send(doc);
            })
        })

    },
    get: (req, res) => {
        const { bookid } = req.params;
        Vote.findOne({ Book: bookid }).populate("Book").populate('users').exec((err, doc) => {
            if (err) res.send("error");
            res.send(doc)
        })
    },
    voting: async (req, res) => {
        const { bookid } = req.params;
        const { users } = req.body;
       Vote.findOne({ Book: bookid }).then(async docs => {
            let filter = null;
                if (docs.users.includes(users)) {
                 let t = docs.users.indexOf(users);
                    filter = docs.users.filter(r => r !== docs.users[t]); 
                     docs.users = filter;
                } else docs.users.push(users);

           await Vote.findByIdAndUpdate(docs._id, docs);
           Vote.find({_id:docs._id}).then(r =>{
               res.send(r)
           });

        });


    },
    getvotes: (req, res) => {

    }
}

router.get("/gettingvotes/:bookid", (req, res) => {
    Postcontroll.get(req, res);
})

router.put("/update/:bookid", (req, res) => Postcontroll.voting(req, res))


router.post("/adding", (req, res) => {
    Postcontroll.vote(req, res);
})

module.exports = router;