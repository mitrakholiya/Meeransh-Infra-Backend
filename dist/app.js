import express from "express";
import authRouter from "./routes/auth.js";
import estimateRoutes from "./routes/estimate.js";
import contactRouter from "./routes/contact.js";
import cors from "cors";
import path from "path";
const app = express();
import { fileURLToPath } from "url";
// Compute __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Fix typo from FORNTEND_URL to FRONTEND_URL and ensure no trailing slash
const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, "") || "";
app.use(cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you are sending cookies
}));
// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api", estimateRoutes);
app.use("/api", authRouter);
app.use("/api/contact", contactRouter);
export default app;
