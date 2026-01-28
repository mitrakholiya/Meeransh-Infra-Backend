import mongoose, { Schema, Document } from "mongoose";

export interface Icontact extends Document {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
}

const contactSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<Icontact>("contact", contactSchema);
