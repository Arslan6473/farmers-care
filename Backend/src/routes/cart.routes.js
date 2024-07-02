import { Router } from "express"
import { createCartItem, deleteCartItem, fetchAllCartItems, updateCartItem } from "../controllers/cart.controller.js"


const router = Router()

router.route("/add-item").post(createCartItem)
router.route("/delete/:id").delete(deleteCartItem)
router.route("/update/:id").patch(updateCartItem)
router.route("/user-items/:id").get(fetchAllCartItems)


export default router