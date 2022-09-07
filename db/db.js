
const mongoose = require("mongoose")
const env = require("dotenv")

env.config();

const dbUser = process.env.DB_USERNAME  
const dbPass = process.env.DB_PASSWORD 


  //  const url = `mongodb://localhost:27017/new`
    const url = `mongodb+srv://Blogdb:Blog123@cluster0.xyb9h.mongodb.net/Blogdb?retryWrites=true&w=majority`
    try {
        mongoose.connect(url,{useNewUrlParser: true , useUnifiedTopology: true})
      console.log("database connection succesfully");
    } catch (error) {
        console.log(error);
    } 
  

    


