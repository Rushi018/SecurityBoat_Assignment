import mongoose from 'mongoose'


const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, required: true },
    imageUrl:{type:String , required:true}
})

const orderSchema = new mongoose.Schema({
    users: { type: String, required: true },
    item: [{
        item: String,
        quantity: { type: Number, min: 1 }
    }],

    totalPrice: { type: Number, required: true },

    orderDate: { type: Date, default: Date.now() },

    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending',
    },

    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    }
})



const Menu = mongoose.model('Menu', menuSchema)
const Order = mongoose.model('Order', orderSchema)

export { Menu, Order }