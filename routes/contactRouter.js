
const express = require('express')

const router = express.Router()

const Contact = require("../models/contactSchema")

router.get("/allmsg", async (req,res)=>{
    const username = req.query.username 
    const email = req.query.email 
    
    try {
        let allmsg  ;
  
        if(username){
            allmsg = await Contact.find({username})
        }else if(email){
            allmsg = await Contact.find({email})
        } else{
            
            allmsg = await Contact.find()
        }
        res.status(200).json(allmsg)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/",async (req,res)=>{
    const {name, email, msg} = req.body
    const newContact = new Contact ({name , email , msg})
    try {
        const saveContact = await newContact.save()
        // console.log(saveContact);
        res.status(200).json(saveContact)
    } catch (error) {
        res.status(500).json(error)
    }


})



module.exports = router