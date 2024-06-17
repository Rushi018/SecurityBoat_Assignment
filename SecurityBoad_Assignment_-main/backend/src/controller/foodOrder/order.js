import { Order, Menu } from '../../model/foodSchema.js'

const placeOrder = async (req, res) => {
    const { user, items } = req.body;
    try {
        let totalPrice = 0;
        for (let i = 0; i < items.length; i++) {
            const menuItem = await Menu.findOne({ name: items[i].item });
            console.log(menuItem);
            if (!menuItem) {
                return res.status(404).json({ error: `Item ${items[i].item} not found in menu` });
            }
            totalPrice += menuItem.price * items[i].quantity;
        }

        const order = new Order({
            users: user,
            item: items,
            totalPrice
        });

        await order.save();

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};




// Get all orders for a user
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getUserOrders = async (req, res) => {
    const {users} = req.body
    console.log(users);
    try {
        const orders = await Order.findOne({users});
        console.log(orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    const {users , status, paymentStatus} = req.body;

    try {
        const order = await Order.user({users});

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (status) {
            order.status = status;
        }

        if (paymentStatus) {
            order.paymentStatus = paymentStatus;
        }

        await order.save();

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const cancelOrder = async (req, res) => {
    const { users } = req.body;

    try {
        const order = await Order.findOneAndDelete({users});
        console.log(order);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = 'Cancelled';
        order.paymentStatus = 'Failed';

        await order.save();

        res.status(200).json({message:"Order cancel successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export { placeOrder, getUserOrders, updateOrderStatus, cancelOrder , getAllOrders }