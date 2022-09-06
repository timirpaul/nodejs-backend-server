

const express = require('express')
const Category = require('../models/categorySchema')
const router = express.Router()



router.post('/', async (request , response) => {
    const newCategory = new Category(request.body)
    try {
        const saveCategory = await newCategory.save()
        response.status(200).json(saveCategory)
    } catch (error) {
        response.status(500).json(error)
    }
})


router.get('/', async (request , response) => {
    
    try {
        const category = await Category.find()
        response.status(200).json(category)
    } catch (error) {
        response.status(500).json(error)
    }
})


module.exports = router