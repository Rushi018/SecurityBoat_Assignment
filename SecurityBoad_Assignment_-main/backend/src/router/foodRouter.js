import express from 'express';
import {addMenu , viewMenu , updatedMenu , deletedMenu} from '../controller/foodOrder/menu.js'
import {placeOrder , getUserOrders , updateOrderStatus , cancelOrder , getAllOrders} from'../controller/foodOrder/order.js'
import {adminVerifyToken} from '../middleware/adminAuthentication.js'

const router = express.Router()

router.post('/api/add/menu' ,adminVerifyToken , addMenu)

router.get('/api/view/menu' , viewMenu)

router.put('/api/update/menu' ,adminVerifyToken , updatedMenu)

router.delete('/api/delete/item' ,adminVerifyToken , deletedMenu)


// This router work for food order

router.post('/api/order/place' , placeOrder)

router.post('/api/get/order' , getUserOrders)

router.get('/api/get/all/order' , getAllOrders)

router.put('/api/update/order' ,adminVerifyToken , updateOrderStatus)

router.delete('/api/cancle/order' , cancelOrder)

export default router