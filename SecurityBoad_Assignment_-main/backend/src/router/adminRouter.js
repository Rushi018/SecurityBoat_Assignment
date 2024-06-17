import express from 'express'
import {adminSignup , adminLogin , viewAdmin , updateAdmin , deleteAdmin} from '../controller/admin/adminController.js'
import {adminVerifyToken} from '../middleware/adminAuthentication.js'

const router = express.Router()

router.post('/api/admin/signup' , adminSignup)

router.post('/api/admin/login' , adminLogin)

router.get('/api/admin/view' , adminVerifyToken , viewAdmin )

router.put('/api/admin/update' , adminVerifyToken , updateAdmin )

router.get('/api/admin/delete' , adminVerifyToken , deleteAdmin )

export default router