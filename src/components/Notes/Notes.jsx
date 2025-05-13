import React from 'react'
import Note from './Note'

import Link from 'next/link'
const Notes = ({ Notes, currentPage, totalpage ,onUpdate }) => {
    return (
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Notes?.length > 0 ? (
                Notes.map((note) => {
                    return <Note note={note} key={note._id} onUpdate={onUpdate} />
                }
                )
            ) : (
                <div className="ml-4  ">
                    {currentPage > totalpage && currentPage > 1 ? (<>
                        <div className='flex flex-col items-center gap-10'>
                            <h1 className='text-6xl'>You Don't have <span className='text-green-600 '>{currentPage} Pages</span> </h1>
                            <Link href={'/'} className='w-full'>
                                <button className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded tracking-widest'>Go Home</button>
                            </Link>
                        </div>
                    </>) : (<>
                        <h1 className='text-5xl text-gray-500'>No <span className='text-green-600'> Notes </span>available</h1>
                    </>)}
                </div>

            )}
        </div>
    )
}

export default Notes
