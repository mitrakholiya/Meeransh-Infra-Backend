import express, { urlencoded } from "express"
import authRouter from "./routes/auth"
import estimateRoutes from "./routes/estimate";
import contactRouter from "./routes/contact"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,               // if using cookies or auth headers
}));


app.use("/api", estimateRoutes);


app.use("/api", authRouter)
app.use("/api/contact",contactRouter)

export default app;