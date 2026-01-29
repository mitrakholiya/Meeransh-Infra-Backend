import express from "express"
import { postContact, getContact, deleteContact } from "../controllers/contact"
import { jwtChecker } from "../middlewares/auth.middleware"
const router = express.Router()

router.post("/", postContact)
router.get("/", jwtChecker,getContact)
router.delete("/:id", jwtChecker,deleteContact)

export default router