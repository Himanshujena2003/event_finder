import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import { userModel } from "./models/user.model.js";
import { eventModel } from "./models/event.model.js";
import connectDb from "./db/db_connection.js";

dotenv.config();
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/user',userRouter);

// Database connection
connectDb();

// Creating collection in database
userModel();
eventModel();

app.listen(port,()=>{
    console.log(`Server is running on: http://localhost:3000`);
})
