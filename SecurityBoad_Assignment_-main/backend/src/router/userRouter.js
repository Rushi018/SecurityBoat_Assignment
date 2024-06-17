import express from 'express'
import {userSignup , userLogin} from '../controller/user.js'

const router = express.Router()

router.post('/api/user/signup' , userSignup)

router.post('/api/user/login' , userLogin)

export default router