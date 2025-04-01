import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        length:10,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

let User;
const userModel = ()=>{
    User = mongoose.model("user",userSchema);
}

export {userModel,User};