'use client'
import React, { useState } from 'react'
import { Edit } from 'lucide-react';

import Link from 'next/link';
import NotedeleteIcon from '../NotedeleteIcon';
import NotePinnedIcon from '../NotePinnedIcon';
import NoteModel from './NoteModel';
const Note = ({ note, onUpdate }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div
                onClick={() => { setOpen(true) }}
                className={` cursor-pointer p-3 rounded-lg shadow-md lg:hover:scale-100 scale-95 ${note.pinned ? "bg-green-700" : "bg-slate-600"} text-white relative h-48 flex flex-col justify-between`}>
                <div className="relative overflow-hidden">
                    <h3 className="text-2xl font-bold mb-1">{note.title}</h3>

                    <div

                        className="prose prose-sm prose-invert max-w-none overflow-hidden h-[120px]
                                [&_h1]:my-1 [&_h1]:leading-tight
                                [&_h2]:my-1 [&_h2]:leading-snug
                                [&_h3]:my-1 [&_h3]:leading-snug
                                [&_p]:my-1 [&_li]:my-0 [&_ul]:my-1 [&_ol]:my-1"
                        dangerouslySetInnerHTML={{ __html: note.note }}
                    />
                </div>
                {/* Icons */}
                <div className="flex justify-between items-center ">
                    <Link href={`/update/${note._id}`}>
                        <Edit className="w-5 h-5 cursor-pointer hover:text-green-400" />
                    </Link>
                    <div className="flex space-x-2">
                        <NotePinnedIcon pin={note.pinned} id={note._id.toString()} onUpdate={onUpdate} />
                        <NotedeleteIcon id={note._id.toString()} onUpdate={onUpdate} />
                    </div>
                </div>
            </div>
            <NoteModel open={open} setOpen={setOpen} note={note} />
        </>
    )
}

export default Note
