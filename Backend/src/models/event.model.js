import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
}, {timestamps:true});


let Event;
const eventModel = ()=>{
    Event = mongoose.model("event",eventSchema);
}

export {eventModel,Event}