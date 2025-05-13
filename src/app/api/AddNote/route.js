import { connect } from "@/lib/dbConnect";
import { Note } from "@/models/noteModel";
import { NextResponse } from "next/server"
// Establish connection with database
connect();
export async function POST(request) {
    try {
        // Get the Data
        const reqBody = await request.json();
        const { user, title, note } = reqBody
        console.log(user, title, note)
        // Generate Payload 
        const newNote = new Note({
            title: title,
            note: note,
            ownerEmail : user.email
        })
        console.log("Step 3: after payload")
        // save the changes
        const savedNote = await newNote.save()
        console.log("Step 4: after save")
        // return the response 
        return NextResponse.json({
            message:"Note Add Successfully",
            success: true,
            savedNote
        },{status:201})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}