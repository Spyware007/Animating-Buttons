import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    isFreelancer:{
        type:Boolean,
        required:true,
        default:false
    },
},{
    timestamps:true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.deleteUser = async function(){
    await this.deleteOne()
}

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = bcrypt.hash(this.password,salt)
})

const User = mongoose.model("User",userSchema)

export default User