import mongoose, { Schema } from "mongoose";
const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        default: "",
    },
    message: {
        type: String,
        default: "",
    }
}, { timestamps: true });
export default mongoose.model("contact", contactSchema);
