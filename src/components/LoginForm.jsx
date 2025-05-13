'use client'
import { doCredentialLogin } from '@/app/actions';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const LoginForm = () => {
    const router = useRouter();
    const [error,setError]=useState(false)
    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        try {
            setError(false)
            const formData = new FormData(event.currentTarget);
            const LoginMsg = toast.loading('Login Successfull')
            console.log(formData);
            const response = await doCredentialLogin(formData);
            toast.dismiss(LoginMsg)
            if(!!response.error){
                toast.error(response.error);
                setError(true)
            }else{
                toast.success(LoginMsg);
                router.push("/")
            }  
        } catch (error) {
            throw new Error("error occur from frontend of Login",error.message)
        }
    }
  return (
    <form  onSubmit={handleFormSubmit} className='w-full max-w-md'>
        { error ? (<><p className='text-red-700'>Check Your Credentials</p></>):(<></>)}
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
    >Login</button>
    <div className="text-center mt-4">
        <p>Don&apos;t have an account?</p>

        <Link href='/register' className='text-lime-500'>Register</Link>
    </div>
    <p className='text-sm text-gray-500 mt-4'>By Signing in, I agree to Etreek Terms of use and Privacy Policy</p>
</form>
  )
}

export default LoginForm
