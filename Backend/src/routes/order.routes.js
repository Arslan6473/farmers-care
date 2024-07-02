import { Router } from "express"
import { createOrder, fetchFilteredOrders, fetchUserOrders, updateOrder } from "../controllers/order.controller.js"


const router = Router()

router.route("/create").post(createOrder)
router.route("/login-user/:id").get(fetchUserOrders)
router.route("/update/:id").patch(updateOrder)
router.route("/").get(fetchFilteredOrders)


export default router