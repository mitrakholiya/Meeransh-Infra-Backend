import { Router } from "express";
import { createEstimate, getEstimates, deleteEstimate } from "../controllers/estimate.contrallers.js";
import { upload } from "../middlewares/upload.middleware.js";
import { jwtChecker } from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/estimate", upload.single("file"), // 👈 field name must be "file"
createEstimate);
router.get("/estimate", jwtChecker, getEstimates);
router.delete("/estimate/:id", jwtChecker, deleteEstimate);
export default router;
