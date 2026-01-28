import mongoose from "mongoose"
let isConnected = false

const connectDB = async():Promise<void>=>{
    if(isConnected){
        console.log("User is existing MongoDB Connection");
        return;
    }

    try{
        const db = await mongoose.connect(process.env.MONGO_URL as string);
        isConnected = !!db.connections[0].readyState;
        console.log("MongoDB is Connected");
    }catch (err){
        console.log("MongoDB connection Failed",err);
        process.exit(1);
    }
}
export default connectDB;