import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
    email: string;
    password: string;
}

const AdminSchema: Schema<IAdmin> = new Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export default mongoose.model<IAdmin>("Auth",AdminSchema);