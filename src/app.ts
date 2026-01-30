import express, { urlencoded } from "express"
import authRouter from "./routes/auth.js"
import estimateRoutes from "./routes/estimate.js";
import contactRouter from "./routes/contact.js"
import cors from "cors"
import path from "path"
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FORNTEND_URL, // your frontend URL
    credentials: true,               // if using cookies or auth headers
}));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.use("/api", estimateRoutes);


app.use("/api", authRouter)
app.use("/api/contact", contactRouter)

export default app;