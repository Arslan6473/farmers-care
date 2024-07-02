import { Router } from "express"
import { createPest, fetchAllPests, fetchSinglePest,fetchSelectedPests } from "../controllers/pest.controller.js"




const router = Router()

router.route("/create").post(createPest)
router.route("/pest/:id").get(fetchSinglePest)
router.route("/pest").get(fetchSelectedPests)
router.route("/").get(fetchAllPests)



export default router