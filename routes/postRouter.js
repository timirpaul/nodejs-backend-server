



const express = require("express")
const router = express.Router()
const Post = require('../models/postSchema')
const Fs = require("fs")



//GET ALL POST
router.get('/allposts', async (request , response) => {

    const username = request.query.username 
    const category = request.query.category
    try {
        let posts 
  
        if(username){
            posts = await Post.find({username})
        }else if(category){
            posts = await Post.find({categories :  [category]})
        } else{
            
            posts = await Post.find()
        }
        
        response.status(200).json(posts)
        
    } catch (error) {
        response.status(500).json(error)
    }
})

//GET post by :id
router.get("/:id", async (request , response)=>{
    try {
        const post = await Post.findById(request.params.id)
        
        response.status(200).json(post)
    } catch (error) {
        response.status(500).json(error)
    }
})

//POST new post
router.post("/", async (request, response) => {
    const { title, description, photo, categories, username } = request.body

    const newPost = new Post({ title, description, photo, categories, username })
    try {

        const savePost = await newPost.save()
        console.log(savePost);

        response.status(200).json(savePost)
    } catch (error) {
        response.status(500).json(error)
    }
})



//update post by :id
router.put('/:id', async (request, response) => {
    const { title, description, photo, categories, username } = request.body

    try {
        const post = await Post.findById(request.params.id)
        

        if (username === post.username) {

            const updatedPost = await Post.findByIdAndUpdate(post.id, {
                title, description, photo, categories, username
                
            },
            {new : true}   // new : true for show updated value in updatePost
            )
            response.status(200).json({ msg: "successfully update Post ", updatedPost })


        } else {
            response.status(500).json({msg:"Not Your Post"})

        }
    } catch (error) {
        response.status(401).json({ msg: "Post Not Update", error })
    }
})
//DELETE post 
router.delete("/:id", async (request , response)=>{

    try {
        const post = await Post.findById(request.params.id)
        
        if(request.body.username === post.username){
            // await Post.findByIdAndDelete(request.params.id)    //or 2nd method
            await Fs.unlinkSync("images/" + post.photo)
            await post.delete()

            response.status(200).json({msg :"Post Delete Successfully !!"})

        }else{
            response.status(401).json({msg :"its Not Your's Post !!"})
        }
    } catch (error) {
        response.status(500).json({msg : "Post Not Delete",error})
    }
})

module.exports = router