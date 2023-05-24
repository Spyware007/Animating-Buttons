import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

const protect = asyncHandler(async(req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        console.log("token found")
    }
    try {
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password")
    } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error("Not authorized, token failed")
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token")
    }
    next()
})

const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error("Not authorized as an admin!")
    }
}

export {protect,admin}