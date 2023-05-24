import React from 'react'

const NavBar = () => {
  return (
    <div className='flex justify-between items-center mt-8 bg-transparent '>
        <div className='flex bg-white rounded-3xl overflow-hidden'>
            <div className='bg-blue-500 px-4 py-2 rounded-3xl'>
               <p className='text-white'>Login</p>
            </div>
            <div className='bg-white pr-4 py-2 ml-2'>
                <p className='text-light'>Sign Up</p>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <p className='font-semibold'>Hire a freelancer</p>
            <p className='font-extrabold text-lg'>・</p>
            <p className='font-semibold'>Search for freelancers</p>
        </div>
    </div>
  )
}

export default NavBar