import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,"provide username"],
        unique: [true]
    },
    email:{
        type:String,
        required: [true,"provide email"],
        unique: [true]
    },
    password:{
        type: String,
        required: [true,"provide password"]
    },    
})

export const User = mongoose.models?.user || mongoose.model("user",UserSchema);