import { Router } from "express"
import { createCrop, fetchAllCrops, fetchSingleCrop } from "../controllers/crop.controller.js"



const router = Router()

router.route("/create").post(createCrop)
router.route("/crop/:id").get(fetchSingleCrop)
router.route("/").get(fetchAllCrops)



export default router