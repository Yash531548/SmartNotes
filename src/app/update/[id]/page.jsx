import UpdateNoteForm from '@/components/UpdateNoteForm';
import { connect } from '@/lib/dbConnect';
import { Note } from '@/models/noteModel';
import React from 'react'

const fetchData = async (id)=>{
      try {
        await connect();
        const note = await Note.findById(id);
        if(note){
          return note;
        }
      } catch (error) {
        throw new Error(error);
      }
}
const page = async({ params }) => {
  const id = params.id
  // console.log("Note id :" + params.id);
  const data = await fetchData(id);
  // console.log("data : " + data);
  //Note id :66c5860cc66b7f676f184599
// data : {
//   _id: new ObjectId('66c5860cc66b7f676f184599'),
//   title: 'Fourteenth ',
//   note: 'This is Fourteenth Note',
//   ownerEmail: 'two@gmail.com',
//   pinned: false,
//   createdAt: 2024-08-21T06:15:40.836Z,
//   updatedAt: 2024-08-21T06:15:40.836Z,
//   __v: 0
// }
  return (
    <div className='h-full  flex flex-col justify-start items-center gap-8 '>
      <div className='mt-4'>
        <h3 className='text-6xl text-lime-500'>Update Note</h3>
      </div>
      <UpdateNoteForm title={data.title} note={data.note} id={data._id.toString()}/>
    </div>
  )
}

export default page
