import Navbar from '@/components/Navbar'
import axios, { AxiosResponse } from 'axios';
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'


export async function getServerSideProps(context: any) {
    const token = context.req.cookies['token'];
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/auth-check`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    })
    const data_json = await data.json();
    console.log(data_json)
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [showUsernameHelper, setShowUsernameHelper] = useState(false)

    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false)
    const [errorMessages, setErrorMessages] = useState<Array<any>>([]);
    const [showSuccess, setShowSuccess] = useState(false)
    const makeUsername = (value: string) => {
        if (value == '') {
            setShowUsernameHelper(false);
        } else {
            setShowUsernameHelper(true);
        }
        let str = value.toLowerCase();
        str = str.replace(/\s+/g, '');

        setUsername(str);

    }

    const formSubmit = async (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        const headers = {
            'Accept': 'application/json'
        }
        try {
            const data: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
                username: username,
                password: password,
                password_confirmation: passwordConfirmation
            });
            if (data.status == 200) {
                setShowSuccess(true);
                setShowError(false);
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
                <title>Register</title>
            </Head>
            <Navbar auth={auth} />
            <div className='px-2 mt-10'>
                <div className='mx-auto lg:w-[400px] rounded bg-white drop-shadow p-4'>
                    <div className='font-bold text-center text-2xl'>
                        Register
                    </div>
                    {
                        showSuccess ? (
                            <div className='my-3 rounded-lg bg-green-200 p-3 '>
                                Account Created!
                            </div>
                        ) : null
                    }
                    {
                        showError ? errorMessages.map((key, index) => {
                            return (
                                <div key={index} className='my-3 rounded-lg bg-red-400 p-3 '>
                                    {key}
                                </div>
                            )
                        }) : null
                    }
                    <form onSubmit={e => formSubmit(e)} action="">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" onChange={e => makeUsername(e.target.value)} placeholder="Username" className="input input-bordered w-full" required disabled={isLoading} />
                            {
                                showUsernameHelper ? (
                                    <>
                                        <div className='mt-2 text-xs '>
                                            Your username will be <span className='text-pink-400'>{username}</span>
                                        </div>
                                    </>
                                ) : null
                            }
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full" required disabled={isLoading} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password Confirmation</span>
                            </label>
                            <input type="password" onChange={e => setPasswordConfirmation(e.target.value)} placeholder="Password" className="input input-bordered w-full" required disabled={isLoading} />
                        </div>
                        <div className="form-control w-full mt-5">
                            <button className='btn hover:bg-pink-400 border-0' disabled={isLoading}>{isLoading ? (
                                'Creating Account...'
                            ) : (
                                'Create Account'
                            )}</button>
                        </div>
                        <div className='text-xs mt-2 text-center'>
                            Already have account? click <Link className='link hover:text-pink-400' href="/login">Here</Link> to login
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Index