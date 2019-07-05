const express = require("express");
const path = require("path");
const {mongoose} = require('./database/database');
const app = express();
const Router = require("./router/router");
const routelike = require('./controller/Likecontroll');

//Files statics
app.use(express.static(path.join(__dirname,"/public")))

//middlewares

app.use(express.json());

//Router
app.use("/",routelike);
app.use("/",Router);


app.listen(8000,()=>{
    console.log("Runing...")
})


