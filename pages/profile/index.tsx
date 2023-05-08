import Navbar from '@/components/Navbar'
import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image';
import React from 'react'
import user from '@/public/user.png'
import { setCookie } from 'cookies-next';
import FormUpload from '@/components/FormUpload';
import UserPost from '@/components/UserPost';
export async function getServerSideProps(context: any) {
    const token = context.req.cookies['token'];
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/auth-check`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    })
    const data_json = await data.json();
    if (data.status == 200 || data.status == 422) {
        return {
            props: { user_data: data_json }
        }
    }
    return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    }
}
function Index({ user_data }: any) {
    return (
        <>
            <Head>
                <title>{user_data.data.username} | My Profile</title>
            </Head>
            <Navbar auth={true} />

            <div className='p-2'>
                <div className='lg:w-[25%] mx-auto rounded bg-white drop-shadow p-5 mt-4'>
                    <div className='flex gap-4 items-center'>
                        <div>
                            <Image width={100} height={100} src={user.src} alt='User Profile'></Image>
                        </div>
                        <div>
                            <p className='font-semibold text-xl'>{user_data.data.username}</p>
                            <div className='mt-2'>
                                <label htmlFor="new-post" className='btn hover:bg-pink-700 bg-pink-400 btn-sm border-0 text-xs rounded-full gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    New Post
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <UserPost />

            </div>
            <input type="checkbox" id="new-post" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className='flex justify-between items-center'>
                        <h3 className="font-bold text-lg">New Post</h3>
                        <label htmlFor="new-post">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </label>
                    </div>
                    <hr className='my-3' />
                    <FormUpload />
                </div>
            </div>
        </>
    )
}

export default Index