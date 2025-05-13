'use client';

import React, { useEffect, useState } from 'react'
import Notes from './Notes/Notes';
import Pagination from './Pagination';
import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import SearchBar from './SearchBar';

const Clientsearch = ({ pageNumber, query }) => {
    const [data, setData] = useState({ Notes: [], totalPages: 1 })
    const [updateTrigger, setUpdateTrigger] = useState(false);

    useEffect(() => {
    const fetchNotes = async ()=>{
        try {
            const url = `/api/UserNotes?query=${encodeURIComponent(query)}&pageNumber=${pageNumber}`
            console.log("Fetching notes from:", url);
            const res = await fetch(url,{
                method: "GET",
                credentials: "include",
            });
            // const raw = await res.text(); // read body once
            // console.log("Raw response:", raw);
            if (!res.ok) throw new Error("Failed to fetch notes");

            const result = await res.json();
            //  const result = JSON.parse(raw); // parse manually 
             console.log("Fetched result:", result); // 🔍 Inspect the structure
    // Only use text and then parse if you want to inspect data in browser
            setData(result);
        } catch (error) {
            console.error("Error Fetching Notes" ,error)
        }
    }
    fetchNotes();
    }, [pageNumber,query,updateTrigger]);

    const handleUpdate = ()=>{
        setUpdateTrigger(prev => !prev);// Toggle to re-trigger useEffect
    }
    
    return (
        <div className=" h-full flex flex-col justify-between bg-[#0f1729] ">
            <div className='flex gap-5 mb-6 mt-6'>
                <Link href='/addNotes'>
                    <MessageSquarePlus width={45} height={45} className="hover:text-green-500" />
                </Link>

                <SearchBar />
            </div>
            <div>
                <Notes Notes={data?.Notes} currentPage={pageNumber} totalpage={data.totalPages} onUpdate={handleUpdate} />
            </div>
            {/* <h1 > <span className="text-green-500">Total Page</span>  : {data?.totalPages || 0}</h1> */}
            <div>
                <Pagination currentPage={pageNumber} totalpage={data.totalPages} query={query} />
            </div>
        </div>
    )
}

export default Clientsearch