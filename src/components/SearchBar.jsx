import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const searchParams = useSearchParams();
    const router = useRouter();

    // Sync Input with Url on mount or query change
    useEffect(()=>{
        const query = searchParams.get('query') || '';
        // console.log("query (searchbar.jsx)" , query);
        setSearchTerm(query);
    },[searchParams])

    // Debounce Logic 
    useEffect(()=>{
        const delayDebounce = setTimeout(() => {
            // 1: Get parameters 
            const params = new URLSearchParams(searchParams.toString()); // Converting parameter into string
            // 2: check about query 
            if(searchTerm.trim() === ""){
                params.delete('query')
            }else{
                params.set('query',searchTerm.trim())
            }
            // 3: Reset page to 1 on new search
            params.set('pageNumber',1)
            // 4: Pust url 
            router.push(`/?${params.toString()}`);
        }, 400); // 400ms Debounce Delay
        return ()=> clearTimeout(delayDebounce);
    },[searchTerm])
    // Handle Input typing 
    const handleSearch = (e)=>{
        setSearchTerm(e.target.value)
    }
    return (
        <input type="text"  
        value={searchTerm}
        onChange={handleSearch}
        placeholder='Search by Title...'
        className="px-4 py-2 w-1/2 rounded-md bg-gray-700 text-white outline-none" />
    )
}

export default SearchBar