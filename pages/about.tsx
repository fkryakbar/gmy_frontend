import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'
export async function getServerSideProps(context: any) {
    const token = context.req.cookies['token'];
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/get`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    })
    const data_json = await data.json();
    if (data.status == 200 || data.status == 422) {
        return {
            props: { auth: true }
        }
    } else {
        return {
            props: {
                auth: false
            }
        }
    }
}
function About({ auth }: { auth: boolean }) {
    return (
        <>
            <Head>
                <title>Gemoy</title>
            </Head>
            <Navbar auth={auth} />
            <div className='lg:w-[25%] mx-auto p-2 mt-3'>
                <div className='rounded bg-white drop-shadow p-5'>
                    <div className='text-center font-bold text-xl'>
                        About
                    </div>
                    <div className='text-center'>
                        This App was created with ❤ and was dedicated to save our memories
                    </div>
                    <div className='text-center mt-5'>
                        <Link className='btn rounded-full bg-pink-400 border-0 hover:bg-pink-800' href="https://happy21hanna.ninepmx.my.id">HAPPY 21</Link>
                    </div>
                    <div className='text-center mt-3 font-semibold'>
                        F & H
                    </div>

                </div>
            </div>
        </>
    )
}

export default About