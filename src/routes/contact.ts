import express from "express"
import { postContact, getContact, deleteContact } from "../controllers/contact"
const router = express.Router()

router.post("/", postContact)
router.get("/", getContact)
router.delete("/:id", deleteContact)

export default router