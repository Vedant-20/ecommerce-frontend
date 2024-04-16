import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  return (
    <header className='h-16 shadow-md bg-white'>
        <div className='h-full container mx-auto flex items-center justify-between px-4'>
            <Link to={'/'}>
            <div className='cursor-pointer'>
                <img src={logo} className='w-[70px] h-[70px]'  alt="logo" />
            </div>
            </Link>
            
            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow  pl-2'>
                <input type="text" placeholder='Search Product Here...' className='w-full outline-none' />
                <div className='text-lg min-w-[50px] h-8 flex items-center justify-center bg-blue-600 rounded-r-full text-white'>
                    <GrSearch/>
                </div>
            </div>

            <div className='flex items-center gap-7'>
                <div className='text-blue-600 text-3xl cursor-pointer'>
                <FaRegCircleUser/>
                </div>
                <div className='text-2xl relative'>
                    <span><FaShoppingCart/></span>
                    <div className='bg-red-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'><p className='text-sm'>0</p></div>
                </div>

                <div>
                    <Link to={`/login`} className='px-2 py-1 border-2 font-bold border-gray-600 hover:border-gray-900 bg-white/85 hover:bg-slate-400 rounded-md'>Login</Link>
                </div>
            </div>

        </div>
    </header>
  )
}

export default Header