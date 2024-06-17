import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

console.log("user dotenc" , process.env.AdminKey);
const adminCreateToken = (email) =>{
    return jwt.sign({email} , process.env.AdminKey , {expiresIn:'1h'})
}

const adminVerifyToken = async(req , res , next) =>{
    
    const token = req.cookies.token || req.headers['authorization'];
    if (!token){
        return res.status(401).json({error : "Access denied. No token provided."})
    }

    try {
        const decodeToken = jwt.verify(token , process.env.AdminKey)
        // const getUserData = await users.findOne({email: decodeToken.email})
        // console.log(getUserData);
        req.user = decodeToken
        
        next()

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong in verify token function"})
    }
}

export {adminCreateToken , adminVerifyToken}