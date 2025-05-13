import AddNoteForm from '@/components/AddNoteForm'
import React from 'react'

const page = () => {
  return (
    <div className='h-full  flex flex-col justify-start items-center gap-8 '>
        <div className='mt-4'>
            <h3 className='text-6xl text-lime-500'>Add Note</h3>
        </div>
       <AddNoteForm/>
    </div>
  )
}

export default page
