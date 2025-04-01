import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const authenticate = (req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();

    if(!token){
        return res.status(401).json({message:"Access denied. no token provided"});
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.fullName = decode.fullName
        req.email = decode.email
        next();
    }

    catch(error){
        return res.status(400).json({message:"Invalid token"});
    }
    
}

export default authenticate;