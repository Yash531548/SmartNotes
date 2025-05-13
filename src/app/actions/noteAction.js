'use server'
import { auth } from '@/auth';
import { connect } from '@/lib/dbConnect';
import { Note } from '@/models/noteModel';
import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';


export const addNoteSubmit = async (formData) => {
    try {
        const { user } = await auth()
        const title = formData.get("title");
        const note = formData.get("noteContent");
        // console.log(user.email, title, note);-
        // Problem : in UrL is '/api/AddNote' -
        //Relative URL in Server Context: The error occurs because you're using a relative URL (i.e., "/api/AddNote") in a server-side context. In Next.js, when you use fetch on the server side, you need to provide an absolute URL, as the server doesn't know how to resolve relative paths like the client-side code does.
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/AddNote`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                user,
                title,
                note
            })
        });
        // Extract only the necessary data
        const result = await response.json();

        revalidatePath("/")
        return {
            status: response.status,
            success: result.success,
            message: result.message,
        };
        // cause of error read at chatgpt 
        // error : This error typically occurs when you're trying to pass something from a server component to a client component that Next.js cannot serialize or pass directly, such as classes, complex objects, or certain built-in types. In your case, it might be caused by the response from the addNoteSubmit function being returned directly to the client component.
        // return response;
        // Cause of an error
        // response.status === 201 && redirect('/');
        // Solution: Client-side Handling: Handle the redirection based on the response:
    } catch (error) {
        throw new Error("Server Part" + error.message);
    }
}

/**The error you're encountering, Error: Frontend PartNEXT_REDIRECT, is likely caused by the redirect function inside the addNoteSubmit function. The redirect function in Next.js is designed to perform a server-side or client-side redirect, but when it's used within server actions or server components, it needs to be handled carefully to avoid throwing errors.

Analyzing the Issue
redirect('/') Usage:

The line response.status === 201 && redirect('/'); is intended to redirect the user to the homepage after successfully saving the note.
The redirect function might be causing issues because it's being used in the server action, and if it triggers a redirect, the action's promise can be rejected, leading to the Error: Frontend PartNEXT_REDIRECT error.
Error Handling:

The catch block is catching this error and re-throwing it with the message "Frontend Part" + error.message, which is why you're seeing the error in the terminal.

Summary
Remove redirect('/') from the server action and handle it on the client side after the server action completes.
Or wrap the redirect('/') in a try-catch block to handle any issues that arise from using redirect in a server action.
This should prevent the Frontend PartNEXT_REDIRECT error and still allow your application to redirect users as needed.
*/

// export const DeleteNote = async (formData) => {
export const DeleteNote = async (id) => {
    try {
        await connect();
        // const id = formData.get("id");
        if (id) {
            try {
                const note = await Note.findById(id);
                if (!note) return { error: "Note Not Found" }
                const deletedNote = await Note.findByIdAndDelete(id);
                if (deletedNote) {
                    console.log("Successfully deleted");
                } else {
                    console.error("Unsuccessfull at deleting the note")    
                }

            } catch (error) {
                console.error("Error:", error);
                return { error: "An error occurred during delete" };
            }
        }

        // BAD IDEA : as by the id findOneAndDelete is deleting note randomly
        // const email = formData.get("email");

        // if (email) {
        //     console.log(email + " Email for delete");

        //     try {
        //         const note = await Note.findOne({ ownerEmail: email });
        //         console.log("note for delete", note);

        //         if (!note) {
        //             return { error: "note not found" };
        //         }

        //         const deletedNote = await Note.findOneAndDelete({ ownerEmail: email });
        //         if (deletedNote) {
        //             console.log("Successfully deleted");
        //         } else {
        //             return { error: "Error deleting note" };
        //         }
        //     } catch (error) {
        //         console.error("Error:", error);
        //         return { error: "An error occurred during deletion" };
        //     }
        // }

    } catch (error) {
        throw new Error("Couldn't delete the Note" + error.message);
    }
    revalidatePath("/");
}

export const UpdateNote = async (formData) => {
    try {
        const title = formData.get("title");
        const note = formData.get("noteContent");
        const id = formData.get("id");
        /**console.log({id,title,note})
         * 
         *{
      data: {
        title: 'Fourteenth ',
        note: 'This is Fourteenth Note',
        id: '66c5860cc66b7f676f184599'
      }
    }  */
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/UpdateNote`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                id,
                title,
                note
            })
        });
         // Extract only the necessary data
         const result = await response.json();
    
         revalidatePath("/")
         return {
             status: response.status,
             success: result.success,
             message: result.message,
         };
    } catch (error) {
        throw new Error("Server Part" + error.message);       
    }
}
// export const PinnedNote = async (formData)=>{
export const PinnedNote = async (id)=>{
    try {
      const user = await auth();
    //   const id = formData.get("id");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/PinnedNote`,{
        method: "POST",
        headers:{
             "content-type": "application/json"
        },
        body: JSON.stringify({
            user,
            id
        })
      })
      const result = await response.json();
    
    }catch (error) {
        throw new Error("Couldn't Pinned the Note" + error.message);       
    }
    revalidatePath("/")
}