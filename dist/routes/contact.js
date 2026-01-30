import express from "express";
import { postContact, getContact, deleteContact } from "../controllers/contact.js";
import { jwtChecker } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/", postContact);
router.get("/", jwtChecker, getContact);
router.delete("/:id", jwtChecker, deleteContact);
export default router;
