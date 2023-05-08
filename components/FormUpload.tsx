import axios, { AxiosProgressEvent } from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { FormEvent, useRef, useState } from 'react'

function FormUpload() {
    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('')
    const [media, setMedia] = useState<any>([])
    const formField = useRef<HTMLFormElement>(null)

    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false)
    const [errorMessages, setErrorMessages] = useState<Array<any>>([])
    const [showSuccess, setShowSuccess] = useState(false)

    const router = useRouter()
    const formSubtmit = async (e: FormEvent) => {
        setIsLoading(true)
        setShowError(false)
        setShowSuccess(false)
        e.preventDefault();

        const data: any = new FormData();
        data.append('title', title);
        data.append('caption', caption);
        for (let index = 0; index < media.length; index++) {
            data.append('media[]', media[index]);
        }
        try {
            const postData = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post/store`, data, {
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    Accept: "application/json",
                    "content-type": "multipart/form-data"
                },

            })
            setShowSuccess(true);
            formField.current?.reset();
            router.push('/profile')
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
            {
                showError ? errorMessages.map((key, index) => {
                    return (
                        <div key={index} className='my-3 rounded-lg bg-red-400 p-3 '>
                            {key}
                        </div>
                    )
                }) : null
            }
            {
                showSuccess ? (
                    <div className='my-3 rounded-lg bg-green-300 p-3 '>
                        Post Uploaded
                    </div>
                ) : null
            }
            <form ref={formField} action="" onSubmit={e => { formSubtmit(e) }}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" placeholder="Type here" onChange={e => { setTitle(e.target.value) }} className="input input-bordered w-full" required disabled={isLoading} />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Pick photos or videos</span>
                    </label>
                    <input type="file" onChange={e => { setMedia(e.target.files) }} className="file-input file-input-bordered w-full" required multiple disabled={isLoading} />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Caption</span>
                    </label>
                    <textarea className="textarea textarea-bordered" onChange={e => { setCaption(e.target.value) }} placeholder="Caption" required disabled={isLoading}></textarea>
                </div>
                <button className='btn hover:bg-pink-500 border-0 mt-3 w-full' disabled={isLoading}>
                    {
                        isLoading ? (
                            'Upload On Progress...'
                        ) : (
                            'Upload'
                        )
                    }
                </button>
            </form>
        </>
    )
}

export default FormUpload