import mongoose, { Schema } from "mongoose";
const EstimateSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    file: {
        type: String, // store filename or path
    },
}, { timestamps: true });
export default mongoose.model("Estimate", EstimateSchema);
