'use client'
import { UpdateNote } from '@/app/actions/noteAction';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import toast from 'react-hot-toast';

const UpdateNoteForm = ({ id, title, note }) => {
    const router = useRouter();
    const [data, setData] = useState({ title: title, noteContent: note, id: id })
    const handleInput = (key, value) => {
        setData((prev) => {
            return { ...prev, [key]: value }
        })
    }
    // console.log({data});
    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            formData.append("noteContent", data.noteContent);
            const updateNoteMsg = toast.loading("Updating Note...");
            const result = await UpdateNote(formData);
            toast.dismiss(updateNoteMsg);
            if (result.status === 201 && result.success) {
                // Redirect or update the UI
                toast.success("Note Update Successfull")
                router.push('/');
            } else {
                toast.error(result.message);
                console.error("Error:", result.message);
            }
            // Enstead of it response.status === 201 && router.push('/');
        } catch (error) {
            console.error("addNOTE Form , Frontend error" + error)
        }
    }
    return (
        <form className='w-7/12' onSubmit={handleUpdate}>
            <div className='mb-4'>
                <input type="hidden" name="id" value={data.id} />
                <label htmlFor="title" className='block  text-gray-700 font-bold mb-1 text-lg'> Title</label>
                <input type="text" name='title' placeholder='Enter Your Title here...' value={data.title}
                    onChange={(e) => { handleInput(e.target.name, e.target.value) }}
                    className='w-full border text-black border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-lime-700' />
            </div>
            <div className='mb-4'>
                <label htmlFor="noteContent" className='text-gray-700 font-bold mb-1 text-lg block'>Text Area</label>
                {/* <textarea name="noteContent" id="noteContent" rows={7} placeholder='Enter Your Note Here...' value={data.noteContent}
                    onChange={(e) => { handleInput(e.target.name, e.target.value) }}
                    className='w-full border text-black border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-lime-700'
                /> */}
                <ReactQuill
                    theme="snow"
                    value={data.noteContent}
                    onChange={(content) => handleInput("noteContent", content)}
                    className='bg-white'
                />
            </div>
            <button type='submit' className='w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded tracking-widest'>Update Note</button>
        </form>
    )
}

export default UpdateNoteForm
