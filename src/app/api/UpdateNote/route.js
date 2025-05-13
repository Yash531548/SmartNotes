import { connect } from "@/lib/dbConnect";
import { Note } from "@/models/noteModel";
import { NextResponse } from "next/server";

// Connect to the database
connect();
/**When to Use Each Approach:
 * method 1;
findByIdAndUpdate: Use this method when you simply need to update a document and don't need to perform any additional logic on the document before saving.
 * method2;
findById + save(): Use this approach when you need to perform more complex logic before saving the document, such as conditionally modifying multiple fields or handling related data. */


// MEHTOD 1:

export async function POST(request) {
    try {
        //  Get the Data from the request body
        const reqBody = await request.json();
        const {id,title,note}= reqBody;
        console.log("api route: ", { id, title, note });
    
        const updatedNote = await Note.findByIdAndUpdate(id,{
            title: title || undefined,
            note: note || undefined
        },{new:true , runValidators: true})
        if (!updatedNote) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        console.log("Step 3: after update");

        // Return the response
        return NextResponse.json({
            message: "Note Successfully updated",
            success: true,
            updatedNote
        }, { status: 201 });
    } catch (error) {
        console.error("Error updating note:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
// ................................................................................................
// Note for method 1 : 
/**Explanation:
findByIdAndUpdate:

The method takes three arguments:
The first is the ID of the document you want to update.
The second is the update object that contains the fields you want to update. In this case, we're updating the title and note fields. If these fields are not provided, they are left as undefined, meaning no changes will be made to those fields.
The third argument is an options object. The new: true option returns the updated document, and runValidators: true ensures that the data adheres to the schema's validation rules.
Handling Not Found:

If the note with the given ID is not found, we return a 404 error.
Response:

If the update is successful, the updated note is returned in the response along with a success message.
Key Advantages:
Efficiency: You don’t need to fetch the document first and then update it. It’s done in a single query.
Conciseness: The code is shorter and easier to maintain. */
//......................................................................................................................
// METHOD 2: 
// export async function POST(request) {
//     try {
//         // Get the Data from the request body
//         const reqbody = await request.json();
//         const { id, title, note } = reqbody;

//         console.log("api route: ", { id, title, note });

//         // Find the note based on id
//         const noteToUpdate = await Note.findById(id);

//         if (!noteToUpdate) {
//             return NextResponse.json({ error: "Note not found" }, { status: 404 });
//         }

//         // Update the note fields
//         noteToUpdate.title = title || noteToUpdate.title;
//         noteToUpdate.note = note || noteToUpdate.note;

//         console.log("Step 3: after payload");

//         // Save the updated note
//         const savedUpdatedNote = await noteToUpdate.save();

//         console.log("Step 4: after save");

//         // Return the response
//         return NextResponse.json({
//             message: "Note Successfully updated",
//             success: true,
//             savedUpdatedNote
//         }, { status: 201 });
//     } catch (error) {
//         console.error("Error updating note:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }
