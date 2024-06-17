import users from '../model/userSchema.js';
import { createToken } from '../middleware/auth.js';

import bcrypt from 'bcrypt'
const salt = 10

const userSignup = async(req , res) =>{
    const {email , password} = req.body

    try {
        const userData = await users.findOne({email})
        
        if (userData){
            return res.status(400).json({message:"User already signup account"})
        }
        
        const passwordHash = await bcrypt.hash(password , salt)
        const submit = new users({...req.body ,password: passwordHash})
        await submit.save()
        
        console.log(submit);
        res.status(201).json({message:"User signup successfully..."})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong in userSignup function"})
    }
}

const userLogin = async(req , res) => {
    const {email , password} = req.body

    try {
        const userData = await users.findOne({email})
        if(!userData){
            return res.status(400).json({error:"please signup your account first "})
        }

        const isPasswordMatch = await bcrypt.compare(password , userData.password)

        if (isPasswordMatch) {
            const token = createToken(email , password)
            res.cookie('token', token)
            console.log(token);
            res.status(200).json({ message: "successfully login...", token , email})
        } else {
            return res.status(401).json({ error: "password is not matching..."})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong in login function" })
    }
}

export {userSignup , userLogin}