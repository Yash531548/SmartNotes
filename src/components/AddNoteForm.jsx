'use client'
import { addNoteSubmit } from '@/app/actions/noteAction';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import toast from 'react-hot-toast';

const AddNoteForm = () => {
    const router = useRouter();
    const [noteContent, setNoteContent] = useState("");

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        try {

            const formData = new FormData(event.currentTarget);
            formData.set('noteContent', noteContent); //  ✅ Make sure it gets into formData
            const AddNotemessage = toast.loading("Adding the Note");
            const result = await addNoteSubmit(formData);
            toast.dismiss(AddNotemessage);
            if (result.status === 201 && result.success) {
                // Redirect or update the UI
                toast.success("Add Note Successfully")
                router.push('/');
            } else {
                toast.error(result.message)
                console.error("Error:", result.message);
            }
            // Enstead of it response.status === 201 && router.push('/');
        } catch (error) {
            console.error("addNOTE Form , Frontend error" + error)
        }
    }
    return (

        <form className='w-7/12' onSubmit={handleSubmitForm}>
            <div className='mb-4'>
                <label htmlFor="title" className='block  text-gray-700 font-bold mb-1 text-lg'> Title</label>
                <input type="text" name='title' placeholder='Enter Your Title here...'
                    className='w-full border text-black border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-lime-700' />
            </div>
            <div className='mb-4'>
                <label htmlFor="noteContent" className='text-gray-700 font-bold mb-1 text-lg block'>Text Area</label>


                <ReactQuill
                    value={noteContent}
                    onChange={setNoteContent}
                    theme="snow"
                    placeholder='Write you Content here ...'
                    className='w-full  border text-white '
                />
                {/* ✅ Hidden field to include content in FormData */}
                <input type="hidden" name="noteContent" value={noteContent} />
            </div>
            <button type='submit' className='w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded tracking-widest'>Add Note</button>
        </form>
    )
}

export default AddNoteForm
