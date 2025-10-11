const express = require('express');
const zod = require('zod');
const {User} = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

const userRouter = express.Router();
const signUpSchema = zod.object({
    username : zod.string().email(),
    firstname : zod.string(),
    lastname : zod.string(),
    password : zod.string()
})
const signInSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

userRouter.post('/signup',async (req,res)=>{
    const success = signUpSchema.safeParse(req.body);
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

userRouter.post('/signin',(req,res)=>{
    const success = signInSchema.safeParse(res.body);
    if(!success) return res.status(411).json({
        message : "Invalid input"
    })
    const user = User.findOne({
        username : req.body.username,
        password : req.body.password
    })
    if(!user) return res.status(411).json({
        message : "Invalid credentials"
    })
    const token = jwt.sign({
        userId : user._id
    },JWT_SECRET);
    res.status(200).json({
        message : "Login successful",
        token : token
    })
})

module.exports = userRouter;