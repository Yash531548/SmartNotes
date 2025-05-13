import { doSocialLogin } from '@/app/actions'
import React from 'react'

const SocialLoginForm = () => {
  return (
    <form className='flex flex-col gap-4 mt-4 w-full max-w-md' action={doSocialLogin}>
    <button type='submit' name='provider' value='google'
        className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded tracking-widest'
    >Sign In with Google</button> 
    <h1 className='text-center text-gray-500' >Or</h1>
</form>
  )
}

export default SocialLoginForm
