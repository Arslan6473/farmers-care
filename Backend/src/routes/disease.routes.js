import { Router } from "express"
import { createDisease, fetchAllDiseases, fetchSingleDisease, fetchSelectedDiseases } from "../controllers/disease.controller.js"



const router = Router()

router.route("/create").post(createDisease)
router.route("/disease/:id").get(fetchSingleDisease)
router.route("/disease").get(fetchSelectedDiseases)
router.route("/").get(fetchAllDiseases)



export default router