'use server'
import { auth } from '@/auth';
import { connect } from '@/lib/dbConnect';
import { Note } from '@/models/noteModel';
import { revalidatePath } from 'next/cache';



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
    } catch (error) {
        throw new Error("Server Part" + error.message);
    }
}

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

export const PinnedNote = async (id) => {
    try {
        const user = await auth();
        //   const id = formData.get("id");
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/PinnedNote`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                user,
                id
            })
        })
        const result = await response.json();

    } catch (error) {
        throw new Error("Couldn't Pinned the Note" + error.message);
    }
    revalidatePath("/")
}