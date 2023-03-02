const express = require('express')
const mongoose = require('mongoose')
const bookingroute = require('./routes/bookingroute')
const userroute = require('./routes/auth')
const cors=require("cors");
// const bodyParser = require("body-parser")



mongoose.set("strictQuery", true);

mongoose.connect("mongodb+srv://manisha:Manisha@travel.cvemn83.mongodb.net/test?retryWrites=true").then(() => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({
        extended:true
        }));
    const corsOptions ={
        origin:'*', 
        credentials:true,            
        optionSuccessStatus:200,
     }
     app.use(cors(corsOptions))

    app.use(bookingroute)
    app.use(userroute)

    app.listen("3001", () => {
        console.log("server created")
    });
});






