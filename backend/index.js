import express from "express"
import morgan from "morgan"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js"

import projectRoutes from "./routes/projectRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

dotenv.config()
connectDB()
const app = express()

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(cors())

app.use(express.json())



app.use("/api/projects",projectRoutes)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)


app.get("/api/config/paypal",(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if(process.env.NODE_ENV==='production'){
    app.get('/',(req,res)=>{
        res.send("API is running..")
    })
    // app.use(express.static(path.join(__dirname,'/frontend/build')))
    // app.get("*",(req,res)=> res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}else{
    app.get('/',(req,res)=>{
        res.send("API is running..")
    })
}


app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on PORT ${process.env.PORT}`))