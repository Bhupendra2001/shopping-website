 const express = require('express')
 const mongoose = require('mongoose')
 const multer = require('multer')
 const cors = require('cors')
 const app = express()
 app.use(multer().any())
 const route = require('./routes/router')
 app.use(express.json())
 require('dotenv').config()
 const Port = process.env.PORT
 app.use(cors())
 mongoose.set('strictQuery', false);
 mongoose.connect(process.env.MongoURL , { useNewUrlParser : true})
 .then(()=>console.log("mongodb connected"))
 .catch((err)=>console.log(err))


 app.use('/api', route )
app.listen(Port , ()=>{
    console.log("server is started in Port " + Port)
})


