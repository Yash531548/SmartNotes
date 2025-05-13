'use client'
import { PinnedNote } from '@/app/actions/noteAction';
import { Star } from 'lucide-react';
import React from 'react'
import toast from 'react-hot-toast';

const NotePinnedIcon = ({id ,pin ,onUpdate}) => {
    const handlePin = async ()=>{
        const PinnedNoteMsg = toast.loading("Pinning the Note...");
        const res = await PinnedNote(id);
        toast.dismiss(PinnedNoteMsg);
        if(res?.error){
          toast.error(res.error)
        }else{
          toast.success("Pinned Note Successfully")
          if(onUpdate) onUpdate();  // ✅ Trigger data re-fetch
        }
      }
  return (
    <div>
      <Star onClick={handlePin} className={`w-5 h-5 cursor-pointer hover:text-white ${pin ? "fill-yellow-500 text-yellow-500" : ""} `} />
    </div>
  )
}

export default NotePinnedIcon
