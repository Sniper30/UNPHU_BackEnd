const express = require("express");

const controller = require("../controller/controller")

let router = express.Router();

//Get
router.get("/get",(req,res)=> controller.getBook.get(req,res));
router.get("/get/:id",(req,res)=>controller.getBook.filter(req,res) );
router.get("/get/:id/:bookid",(req,res)=>controller.getBook.filterOne(req,res) );
router.get("/validate/:user",(req,res)=>controller.getOnUser(req,res))

//Post
router.post("/enteruser",(req,res)=> controller.login(req,res));
router.post("/adduser",(req,res)=>controller.adduser(req,res));

//Delete
router.delete("/remove/:id",(req,res)=> controller.remove(req,res));

router.put("/modify/:id/:bookid",(req,res)=> controller.modify(req,res));

router.patch("/votation/:userid/:bookid",(req,res)=> controller.votation(req,res));





module.exports = router;