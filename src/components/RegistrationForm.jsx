'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const RegistrationForm = () => {
    const router = useRouter()
    const handleSubmit = async (event)=>{
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget)
            const username = formData.get('name');
            const email = formData.get('email')
            const password = formData.get('password')

            const response = await fetch("/api/Register",{
                method: 'POST',
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            response.status === 201 && router.push('/login');
        } catch (error) {
            console.error("Error occur while Registering")
            throw new Error(error.message);
        }
    }
  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md'>
            <div className='mb-4'>
                <label htmlFor="name"
                    className='block  text-gray-700 font-bold mb-2'
                >Name</label>
                <input
                    type="text"
                    name='name'
                    id='name'
                    className='w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-lime-700' />
            </div>
            <div className='mb-4'>
                <label htmlFor="email"
                    className='block  text-gray-700 font-bold mb-2'
                >Email</label>
                <input
                    type="email"
                    name='email'
                    id='email'
                    className='w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-lime-700' />
            </div>
            <div className='mb-4'>
                <label htmlFor="password"
                    className='block  text-gray-700 font-bold mb-2'
                >Password</label>
                <input
                    type="password"
                    name='password'
                    id='password'
                    className='w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-lime-700' />
            </div>
            <button type="submit"
            className='w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded tracking-widest'
            >Register</button>
            <div className="text-center mt-4">
                <p>Already have an Account?</p>
                <Link href='/login' className='text-lime-500'>Login</Link>
            </div>
            <p className='text-sm text-gray-500 mt-4'>By Signing in, I agree to NoteNest Terms of use and Privacy Policy</p>
        </form>
  )
}

export default RegistrationForm
