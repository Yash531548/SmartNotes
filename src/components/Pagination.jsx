// 'use Client'
import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
const Pagination = ({ currentPage, totalpage , query}) => {
    // console.log("pagination:", { currentPage, totalpage });
    const buildUrl = (page)=>{
        const params = new URLSearchParams();
        if(query?.trim()) params.set('query',query);
        params.set('pageNumber',page)
        return `/?${params.toString()}` 
    }
    return (
        <div className="flex justify-center items-center mt-8 mb-4 gap-2">
            {/* <Link href={currentPage === 1 ? "#" : `/?pageNumber=${currentPage - 1}`}> */}
            <Link href={currentPage === 1 ? "#" : buildUrl(currentPage - 1)}>
                <button
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 hover:text-white p-2' : 'text-blue-500'}`}
                >
                    <ChevronLeft size={20} />
                </button>
            </Link>

            <span className="mx-4 text-lg font-medium flex gap-5">
                {/* Page {currentPage} of {totalpage} */}
                {
                    [...Array(totalpage)].map((_ele, index) => (
                        // <Link href={ `/?pageNumber=${index + 1}`}>
                        <Link key={index} href={buildUrl(index + 1)}>
                            <button  className={` w-8 h-8 rounded-full flex items-center justify-center ${currentPage === index+1 ? "bg-green-600  text-gray-200" :"bg-gray-800"}`}>{index + 1}</button>
                        </Link>
                    ))
                }
            </span>
            {/* <Link href={currentPage === totalpage ? "#" : `/?pageNumber=${currentPage + 1}`}> */}
            <Link href={currentPage === totalpage ? "#" : buildUrl(currentPage + 1)}>
                <button
                    disabled={currentPage === totalpage}
                    className={`p-2 rounded-md ${currentPage === totalpage ? 'text-gray-400 hover:text-white p-2' : 'text-blue-500'}`}
                >
                    <ChevronRight size={20} />
                </button>
            </Link>
        </div>
    )
}

export default Pagination
