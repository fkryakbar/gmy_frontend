import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import moment from 'moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import MediaSlides from './MediaSlides';
const MySwal = withReactContent(Swal)
function UserPost() {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/get`, {
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`,
                    "Accept": "application/json"
                }
            })
            setPosts(data.data.data.posts);
        } catch (err) {
            setPosts([]);
        }
        setIsLoading(false)
    }

    const deletePost = async (e: any) => {
        const post_id = e.currentTarget.getAttribute('data-post-id');
        MySwal.fire({
            title: <p>Delete Post?</p>,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: <p>Yes</p>,
            cancelButtonText: <p>Cancel</p>,
            cancelButtonColor: '#d33',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const data = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post/delete`, { post_id: post_id }, {
                        headers: {
                            "Authorization": `Bearer ${getCookie('token')}`,
                            "Accept": "application/json"
                        }
                    });
                    if (data.status == 200) {
                        MySwal.fire({
                            title: 'Deleted!',
                            text: "Post Deleted",
                            icon: "success",
                        })
                    }
                    fetchData()
                } catch (err: any) {
                    MySwal.fire({
                        title: 'Failed!',
                        text: `${err.message}`,
                        icon: "error",
                    })
                }


            }
        })
    }

    return (
        <>
            {
                isLoading ? (
                    <Loading />
                ) : posts.length > 0 ? posts.map((post: any, key: number) => {
                    return (
                        <div key={post.id} className='lg:w-[25%] mx-auto rounded bg-white drop-shadow p-2 mt-3'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h1 className='font-semibold'>
                                        {post.title}
                                    </h1>
                                    <h1 className='text-slate-600 text-xs'>
                                        {post.user_id}
                                    </h1>
                                </div>
                                <div>
                                    <button className='btn bg-red-500 btn-sm border-0 hover:bg-red-900' data-post-id={post.id} onClick={e => { deletePost(e) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className='rounded w-full mt-3'>
                                <MediaSlides data={post.get_media} />
                            </div>
                            <div className='mt-3 text-xs'>
                                <span className='font-semibold'>{post.user_id}</span> <span>{post.caption}</span>
                                <div className='text-[8px] text-slate-600'>
                                    {moment(post.created_at).fromNow()}
                                </div>
                            </div>

                        </div>
                    )
                }) : (
                    <div className='lg:w-[25%] mx-auto rounded bg-white drop-shadow p-2 mt-3'>
                        <div className='text-center text-xs text-slate-600 italic'>
                            You don&#39;t have any posts
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UserPost