import app from "./app.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()

connectDB()

const PORT = process.env.PORT || 6000
app.listen(PORT, (): void => {
console.log(`You Server Is Started in ${PORT}`);

})