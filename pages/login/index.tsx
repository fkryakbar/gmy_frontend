import Navbar from '@/components/Navbar'
import Head from 'next/head'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { setCookie } from "cookies-next";
import { useRouter } from 'next/router'


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

function Index({ auth }: { auth: boolean }) {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false)
    const [errorMessages, setErrorMessages] = useState<Array<any>>([]);
    const [showSuccess, setShowSuccess] = useState(false)
    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        setShowError(false);
        setShowSuccess(false)
        const headers = {
            'Accept': 'application/json'
        }
        try {
            const data: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                username: username,
                password: password,
            }, { headers: { Accept: 'application/json' } });
            if (data.status == 200) {
                setCookie('token', data.data.data.token)
                router.push('/profile')
            }
        } catch (err: any) {
            let error_messages: Array<string> = [];
            Object.keys(err.response.data.errors).forEach(function (key, index) {
                error_messages.push(err.response.data.errors[key]);
            })
            setErrorMessages(error_messages);
            setShowSuccess(false);
            setShowError(true);

        }
        setIsLoading(false)
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Navbar auth={auth} />

            <div className='px-2 mt-10'>
                <div className='mx-auto lg:w-[400px] rounded bg-white drop-shadow p-4'>
                    <div className='font-bold text-center text-2xl'>
                        Login
                    </div>
                    {
                        showError ? errorMessages.map((key, index) => {
                            return (
                                <div key={index} className='my-3 rounded-lg bg-red-400 p-3 '>
                                    {key}
                                </div>
                            )
                        }) : null
                    }
                    <form action="" onSubmit={e => { formSubmit(e) }}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" onChange={e => { setUsername(e.target.value) }} name='username' placeholder="Username" className="input input-bordered w-full" disabled={isLoading} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" onChange={e => { setPassword(e.target.value) }} placeholder="Password" className="input input-bordered w-full" disabled={isLoading} />
                        </div>
                        <div className="form-control w-full mt-5">
                            <button className='btn hover:bg-pink-400 border-0' disabled={isLoading}>{
                                isLoading ? (
                                    'Logging in...'
                                ) : (
                                    'Login'
                                )
                            }</button>
                        </div>
                        <div className='text-xs mt-2 text-center'>
                            Don&#39;t have any account? click <Link className='link hover:text-pink-400' href="/register">Here</Link> to create one
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Index