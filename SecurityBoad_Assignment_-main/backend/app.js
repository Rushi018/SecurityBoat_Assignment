import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import bodyparser from 'body-parser'
import cors from 'cors'
import userRouter from './src/router/userRouter.js'
import moviesRouter from './src/router/moviesRouter.js'
import foodRouter from './src/router/foodRouter.js'
import adminRouter from './src/router/adminRouter.js'
import dotenv from 'dotenv';
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8001

app.use(cors({
    origin: true,
    methods:['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}))

app.use(bodyparser.json())
app.use(express.json())
app.use(cookieParser())
app.use('/', userRouter)
app.use('/' , moviesRouter)
app.use('/' , foodRouter)
app.use('/' , adminRouter)

mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log("connecting successfully...");
    }).catch((error) => {
        console.log(error);
    })


app.listen(PORT , () =>{
    console.log(`Server running at http://localhost:${PORT}`);
})

