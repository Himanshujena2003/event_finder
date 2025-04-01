import {Event} from "../models/event.model.js"
import {User} from "../models/user.model.js"
import zod from "zod"

const eventDetails = zod.object({
    eventName: zod.string(),
    category: zod.string(),
    desc: zod.string(),
    address: zod.string(),
    day: zod.string().regex(/^\d{1,2}$/, "Invalid day format"),
    month: zod.string().regex(/^\d{1,2}$/, "Invalid month format"),
    year: zod.string().regex(/^\d{4}$/, "Invalid year format"),
    hour: zod.string().regex(/^\d{1,2}$/, "Invalid hour format"),
    minute: zod.string().regex(/^\d{1,2}$/, "Invalid minute format"),
    ampm: zod.enum(["AM", "PM"]),
    place: zod.string(),
    price: zod.string()
});


// Adding a event to database
const createEvent = async(req,res)=>{
    
    try{
        const {eventName,category,desc,address,place,price} = req.body;

        if(!eventName || !category || !desc || !place || !address || !price){
            return res.status(400).json({
                status:"Failed",
                message:"Enter all inputs"
            })
        }

        const data = req.body;
        const date = `${data.day.padStart(2, "0")}/${data.month.padStart(2, "0")}/${data.year.slice(2)}`;
        const hour = data.hour.padStart(2, "0");
        const minute = data.minute.padStart(2, "0");
        const time = `${hour}:${minute} ${data.ampm}`;

        const isSafe = eventDetails.safeParse(req.body);
        if(!isSafe){
            return res.status(400).json({
                status:"Failed",
                message:"Enter valid inputs"
            })
        }
        
        
        // const email = req.email;
        const isEventName = await Event.findOne({eventName});
        const isPlace = await Event.findOne({place});
        // const isTime = await Event.findOne({time});
        // const isDate = await Event.findOne({date});

        if(isEventName && isPlace){
            return res.status(400).json({
                status:"Failed",
                message:"Event is already exists"
            })
        }

        // const userData = await User.findOne({email})
        await Event.create({
            eventName,
            category,
            desc,
            address,
            date,
            time,
            place,
            price,
        })

        res.status(200).json({
            status:true,
            message:"Event added successfully"
        })
    }

    catch(error){
        console.log(error)
        res.status(500).json({
            status:"Failed",
            message:"Server error",
        })
    }
}


// Getting all events
const fetchEvents = async(req,res)=>{

    try{
        const {category} = req.query
        const query = {}

        if(category){
            if(category == "All Categories"){
                const events = await Event.find({});
                res.status(200).json({
                    status:true,
                    message:"Events get loaded",
                    events
                })
            }
            else{
                query.category = category;
            }
        }

        const events = await Event.find(query);
        res.status(200).json({
            status:true,
            message:"Events get loaded",
            events
        })
    }

    catch(error){
        console.log(error)
        res.status(500).json({
            status:"Failed",
            message:"Server error"
        })
    }
}



export {createEvent,fetchEvents}


