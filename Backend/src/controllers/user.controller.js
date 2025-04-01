import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import zod from "zod"
import {User} from "../models/user.model.js"


const signupBody = zod.object({
    fullName:zod.string(),
    email:zod.string().email(),
    phone:zod.string(),
    password:zod.string()
})

// User signup
const registerUser = async(req,res)=>{

    try{
        const {fullName , email , phone, password} = req.body;

        if(!fullName || !email || !phone || !password){
            res.status(400).json({
                status:"Failed",
                message:"Enter all inputs"
            })
        }

        const isSafe = signupBody.safeParse(req.body)
        if(!isSafe){
            res.status(400).json({
                status:"Failed",
                message:"Enter valid Inputs"
            })
        }

        const isUser = await User.findOne({email})
        if(isUser){
            res.status(400).json({
                status:"Failed",
                message:"User already exist"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);
        await User.create({
            fullName,
            email,
            phone,
            password:hashPassword
        })

        res.status(200).json({
            status:true,
            message:"user successfully created"
        })
    }

    catch(error){
        res.status(500).json({
            status:"Failed",
            message:"server error"
        })
    }
}


// User login
const loginUser = async(req,res)=>{

    try{
        const {email,password} = req.body;

        if(!email || !password){
            res.status(400).json({
                status:"Failed",
                message:"Enter all inputs"
            })
        }

        const isUser = await User.findOne({email})
        if(!isUser){
            res.status(400).json({
                status:"Failed",
                message:"Invalid email"
            })
        }

        const passMatch = await bcrypt.compare(password,isUser.password);
        if(!passMatch){
            res.status(400).json({
                status:"Failed",
                message:"Invalid password"
            })
        }

        const token = jwt.sign(
            {
                fullName:isUser.fullName,
                email:email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"1h"
            }
        )

        res.status(200).json({
            status:true,
            message:"Loggedin successfully",
            token
        })
    }

    catch(error){
        res.status(500).json({
            status:"Failed",
            message:"Server error"
        })
    }
}


export {registerUser,loginUser}