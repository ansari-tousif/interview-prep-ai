import React from 'react'
import ProfileInfoCard from '../Cards/profileInfoCard'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-15 bg-white border border-b bg-gray-200/20'>
        <div className='container flex mx-auto items-center justify-between gap-5 p-2'>
            <Link to={"/dashboard"}>
                <h2 className='text-lg md:text-xl font-medium text-black leading-4'>Interview Prep AI</h2>
            </Link>

            <ProfileInfoCard />
        </div>
    </div>
  )
}

export default Navbar