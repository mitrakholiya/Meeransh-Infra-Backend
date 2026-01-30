import mongoose, { Schema, Document } from "mongoose";

export interface IEstimate extends Document {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  fileUrl?: string;
  publicId: string,
}

const EstimateSchema: Schema = new Schema(
  {
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
    fileUrl: {
      type: String, // store filename or path
    },
    publicId: {
      type: String, // store filename or path
    },
  },
  { timestamps: true }
);

export default mongoose.model<IEstimate>("Estimate", EstimateSchema);
