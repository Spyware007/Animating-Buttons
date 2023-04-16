import mongoose from "mongoose"
import dotenv from "dotenv"
import users from './data/users.js'
import projects from './data/projects.js'
import User from "./models/userModel.js"
import Project from "./models/projectModel.js"
import Order from "./models/orderModel.js"
import { connectDB } from "./config/db.js"

dotenv.config();

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        // await Project.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleProducts = projects.map(project => {
            return {
                ...project,
                user:adminUser
            }
        })
        await Project.insertMany(sampleProducts)
        console.log("Data Imported!")
        process.exit(1)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Project.deleteMany()
        await User.deleteMany()

       
        console.log("Data Destroyed!")
        process.exit(1)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

if(process.argv[2]==="-d"){
    destroyData()
}else{
    importData()
}