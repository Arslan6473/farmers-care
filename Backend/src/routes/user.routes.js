import { Router } from "express"
import {changeAccountDetails, getCurrentUser, loginUser, registerUser} from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/current-user/:id").get(getCurrentUser)
router.route("/update-user/:id").patch(changeAccountDetails)



export default router