'use client'
import { DeleteNote } from '@/app/actions/noteAction'
import { Trash } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

const NotedeleteIcon = ({id , onUpdate}) => {
  const handleDelete = async ()=>{
    const deleteNoteMsg = toast.loading("Deleting Note...");
    const res = await DeleteNote(id);
    toast.dismiss(deleteNoteMsg);
    if(res?.error){
      toast.error(res.error)
    }else{
      if(onUpdate) onUpdate();
      toast.success("Delete Note Successfully")
    }
  }
  return (
    <div>
      <Trash onClick={handleDelete} className="w-5 h-5 cursor-pointer hover:text-green-400"/>
    </div>
  )
}

export default NotedeleteIcon
