import Admin from '../../model/adminSchema.js'
import {adminCreateToken} from '../../middleware/adminAuthentication.js'
import bcrypt from 'bcrypt'
const salt = 10

const adminSignup = async(req , res) =>{
    const {email , role ,  password} = req.body
    try {
        const check = await Admin.findOne({email})
        if(check){
            return res.status(400).json({error:"admin already exists "})
        }
         
        if(!role){
            return res.status(400).json({error:"please defind your role "})
        }

        const passwordHash = await bcrypt.hash(password , salt)

        const submit = new Admin({...req.body,password: passwordHash})
        await submit.save()
        res.status(201).json({message:"Account create successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"server error in admin signup"})
    }

}

const adminLogin = async(req , res) =>{
    const {email ,role , password} = req.body
    try {
        const check = await Admin.findOne({email})
        if(!check){
            return res.status(400).json({error: "please create your account first"})
        }

        if(role !== 'admin'){
            return res.status(401).json({error:"sorry only admin can login this page"})
        }

        const isPasswordMatch = await bcrypt.compare(password , check.password)

        if (isPasswordMatch) {
            const token = adminCreateToken(email)
            res.cookie('token', token)
            res.status(200).json({ message: "successfully login..." })
        } else {
            return res.status(400).json({ error: "password is not matching..." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong in login function " })
    }
}


const viewAdmin = async (req, res) => {
    try {
        const findData = await Admin.find({}, { _id: 0, password: 0, __v: 0 }); // projection

        if (!findData) {
            return res.status(400).json({ message: "Sorry we don't have any data..." })
        }

        res.status(200).json({ findData })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong in allUers function" })
    }
}



const updateAdmin = async (req, res) => {
    const { email , password} = req.body
    try {
        console.log("user request " , req.user);
        const findData = await Admin.findOne({ email })
        if (!findData) {
            return res.status(400).json({ error: "Please sign up your account." })
        }
        
        
        if (req.user.email !== findData.email) {
            return res.status(400).json({ message: "User not found or unauthorized " });
        }

        let passwordHash = await bcrypt.hash(password, salt)
        const getData = { ...req.body, password: passwordHash }
        const updateData = await Admin.findOneAndUpdate({ email }, { $set: getData }, { new: true })
        res.status(200).json(updateData)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong in update function " })
    }
}

const deleteAdmin = async (req, res) => {
    const { email } = req.body;
    try {
        const findData = await Admin.findOne({ email });
        if (!findData) {
            return res.status(400).json({ error: "User not found." });
        }

       
        if (req.user.email !== findData.email) {
            return res.status(403).json({ message: "Unauthorized. You can only delete your own account." });
        }

        await Admin.findOneAndDelete({ email});
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong in delete function" });
    }
};

export {adminSignup , adminLogin , viewAdmin , updateAdmin , deleteAdmin}