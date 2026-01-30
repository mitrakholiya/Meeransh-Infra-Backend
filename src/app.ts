import express, { urlencoded } from "express"
import authRouter from "./routes/auth.js"
import estimateRoutes from "./routes/estimate.js";
import contactRouter from "./routes/contact.js"
import cors from "cors"
import path from "path"
const app = express()

import { fileURLToPath } from "url";

// Compute __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : [];

// Fallback to defaults if no env var is set (useful for local dev)
if (allowedOrigins.length === 0) {
    allowedOrigins.push("http://localhost:5173", "http://localhost:3000");
}

if (process.env.FRONTEND_URL) {
    const frontendUrl = process.env.FRONTEND_URL.replace(/\/$/, "");
    if (!allowedOrigins.includes(frontendUrl)) {
        allowedOrigins.push(frontendUrl);
    }
}

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.use("/api", estimateRoutes);


app.use("/api", authRouter)
app.use("/api/contact", contactRouter)

export default app;