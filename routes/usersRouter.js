
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const User = require('../models/userSchema')
const Post = require('../models/postSchema')
const bcrypt = require('bcrypt');


//GET
router.get('/:id' , async (request , response) => {
    
        try {
            
            const user = await User.findById(request.params.id)
            const {password , ...others } = user._doc
            response.status(200).json(others)
            
            
            
        } catch (error) {
            response.status(401).json({msg : "User NOt Found !!"})
        }
   
})



//update
router.put('/:id', async (request,response)=>{
    const {name, email ,profilePic } = request.body
    
    console.log(request.body.userId);
    console.log(request.params.id);
    if(request.body.userId === request.params.id){

        if(request.body.password){
            const salt = await bcrypt.genSalt(10);
            request.body.password = await bcrypt.hash(request.body.password , salt)
            
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(request.params.id,{
                // $set : request.body
                name,email,password: request.body.password ,profilePic
            },
            {new: true}  // new : true for show updated value in updatedUser
            )

            
            response.status(200).json({msg :"successfully update User ", updatedUser})
        } catch (error) {
            console.log(error);
            response.status(500).json(error)
            
        }
    } else {
        response.status(401).json("User Auth error")
        
    }
})

//delete 
router.delete("/:id", async (request , response) => {
    console.log(request.body.userId);
    console.log(request.params.id);
    
    if (request.body.userId === request.params.id){
        const user = await User.findById(request.params.id)
        
        
        try {
            if(user){
                
                await Post.deleteMany({ username : user.username })
                await User.findByIdAndDelete(request.params.id)
                response.status(200).json("User has been Deleted !!")
            }else{
                response.status(401).json({msg : "User Not Found"})
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({"error" : error})
            
        }
    } else {

        response.status(500).json("You can not delete !!")
    }
})




module.exports = router ;

