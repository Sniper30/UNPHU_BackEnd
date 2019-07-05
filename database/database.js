const mongoose = require('mongoose');

mongoose.connect("http://mongodb://localhost:27017/Library",{useNewUrlParser:true,useFindAndModify:false}).then(()=>{
    console.log("base de datos conectada");
}).catch(()=>console.log("error en la base de datos"));

module.exports = mongoose;