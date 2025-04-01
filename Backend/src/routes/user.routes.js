import {Router} from "express"
import authenticate from "../middlewares/authentication.js"
import {registerUser,loginUser} from "../controllers/user.controller.js"
import {fetchEvents,createEvent} from "../controllers/event.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/events").get(fetchEvents)
userRouter.route("/createEvent").post(createEvent)
// userRouter.route("/updateEvent").patch(authenticate,updateEvent)

export default userRouter 