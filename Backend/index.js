import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connect } from 'mongoose';
import connectDB from './utils/db.js';
import router from './routes/user.route.js';
import Postrouter from './routes/post.route.js';
import messageRouter from './routes/message.route.js';
dotenv.config({});

const app = express()
const PORT = process.env.PORT || 3000

app.get('/',(req,res)=>{
    return res.status(200).json({
        message : "hello nigga",
        success:true
    })
})
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))
const corsOptions = {
    origin : 'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))

app.use("/api/v1/user", router);
app.use("/api/v1/post", Postrouter);
app.use("/api/v1/message", messageRouter);

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`Server is listen at port ${PORT}`);
    
})