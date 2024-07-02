import { Router } from "express"
import { createProduct, fetchFilteredProducts, fetchSingleProduct, updateProduct } from "../controllers/product.controller.js"


const router = Router()

router.route("/create").post(createProduct)
router.route("/").get(fetchFilteredProducts)
router.route("/update/:id").patch(updateProduct)
router.route("/product/:id").get(fetchSingleProduct)


export default router