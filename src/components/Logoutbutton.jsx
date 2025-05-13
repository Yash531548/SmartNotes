import { doLogout } from '@/app/actions'
import React from 'react'

const Logoutbutton = () => {
  return (
    <form action={doLogout} >
         <button type="submit"
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded'
            >Logout</button>
    </form>
  )
}

export default Logoutbutton
