import express from "express"
import {jwtChecker} from "../middlewares/auth.middleware"
import {adminLogin,adminRegister} from "../controllers/auth"
const router = express.Router()

router.post("/admin/register",adminRegister)
router.post("/admin/login",adminLogin)

export default router