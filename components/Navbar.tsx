import React, { useState } from 'react'
import Link from 'next/link'



function Navbar({ auth }: { auth: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <nav className='py-2 bg-white drop-shadow w-full'>
                <div className='lg:w-[80%] px-2 mx-auto lg:flex justify-between items-center'>
                    <div className='flex justify-between items-center'>
                        <div className='hover:bg-pink-400 hover:text-white cursor-pointer p-3 rounded-md'>
                            <Link href='/' className='font-bold'>
                                Gemoy
                            </Link>
                        </div>
                        <button onClick={e => setIsOpen(!isOpen)} className='lg:hidden btn bg-white text-black border-0 hover:text-white hover:bg-pink-400'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className={`flex lg:flex-row lg:h-fit flex-col gap-6 ${isOpen ? 'h-[250px]' : 'h-0'} transition-all overflow-clip px-3 pt-2`}>
                        {
                            auth ? (
                                <>
                                    <Link href="/profile">
                                        My Profile
                                    </Link>
                                    <Link href="/logout">
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        Login
                                    </Link>
                                    <Link href="/register">
                                        Register
                                    </Link>
                                </>
                            )
                        }
                        <Link href="/about">
                            About
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar