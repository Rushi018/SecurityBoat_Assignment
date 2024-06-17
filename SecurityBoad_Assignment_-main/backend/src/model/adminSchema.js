import mongoose from 'mongoose'

const adminSchem = new mongoose.Schema({
    name:{type:String , require:true},
    role: {type:String , require:true},
    email:{type:String , require:true},
    password:{type:String , require:true}
})

const Admin = mongoose.model('Admin' , adminSchem)

export default Admin