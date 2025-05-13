import RegistrationForm from '@/components/RegistrationForm'
import SocialLoginForm from '@/components/SocialLoginForm'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-2xl font-bold mb-3">Register</h2>
    <SocialLoginForm/>
    < RegistrationForm/>
  </div>
  )
}

export default page
