import { Router } from "express";
import { createEstimate } from "../controllers/estimate.contrallers";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post(
  "/estimate",
  upload.single("file"), // 👈 field name must be "file"
  createEstimate
);


export default router;
