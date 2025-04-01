import mongoose from "mongoose"

const connectDb = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URL}hello`);
        console.log("Database connected...")
    }
    catch(error){
        console.log("Error in connection",error);
    }
}

export default connectDb