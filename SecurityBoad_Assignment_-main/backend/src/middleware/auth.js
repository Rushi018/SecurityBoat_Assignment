import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

const createToken = (email , password) =>{
    return jwt.sign({email, password} , process.env.SecretKey , {expiresIn:'1h'})
}

const verifyToken = async(req , res , next) =>{
    
    const token = req.cookies.token 
    console.log(token)
    if (!token){
        return res.status(401).json({error : "Access denied. No token provided."})
    }

    try {
        const decodeToken = jwt.verify(token , process.env.SecretKey)
        console.log("verifyToken" , decodeToken);
        req.user = decodeToken
        
        next()

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong in verify token function"})
    }
}

export {createToken , verifyToken}