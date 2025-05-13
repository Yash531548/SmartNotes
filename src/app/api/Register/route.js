import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { User } from "@/models/userModel";
import { connect } from "@/lib/dbConnect";
// connection with database
connect();
export async function POST(request){
    try {
        console.log("Register (api) route")
        // Get the Field
        const reqBody = await request.json();
        console.log("step: 1")
        const {username , email, password}= reqBody;
        
        // Encrypt password
        console.log("step: 2", console.log(username,email,password))
        const salt = await bcrypt.genSalt(10);
        console.log("step: 3",salt)
        const hashedPassword = await bcrypt.hash(password,salt);
        console.log("step: 4",hashedPassword)
        // Update the payload
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        console.log("step: 5", newUser)
        // save the user
        const savedUser = await newUser.save()
        console.log("step: 6", savedUser)
        return NextResponse.json({
            message:"User Registered Successfully",
            success: true,
            savedUser
        },{status:201})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}