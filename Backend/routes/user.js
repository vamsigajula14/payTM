const express = require('express');
const zod = require('zod');
const {User} = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

const userRouter = express.Router();
const schema = zod.object({
    username : zod.string().email(),
    firstname : zod.string(),
    lastname : zod.string(),
    password : zod.string()
})

userRouter.post('/signup',async (req,res)=>{
    const success = schema.safeParse(req.body);
    if(!success) return res.status(411).json({
        message : "invalid inputs"
    })
    const userData = await User.findOne({
        username : req.username
    })
    if(userData){
        return res.status(411).json({
            message : "email already exist"
        })
    }
    const user = await User.create({
        username : req.username,
        firstname : req.firstname,
        lastname : req.lastname,
        password : req.password
    })
    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET)
    res.status(200).json({
        message : "user created successfully",
        token : token
    })
})

module.exports = userRouter;