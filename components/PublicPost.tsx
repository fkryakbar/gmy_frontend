import usePost from '@/lib/Post'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Loading from './Loading'
import 'swiper/css';
function PublicPost() {
    const { posts, loadMore, isLoadMoreLoading, isLoading, page, maxPage } = usePost()
    return (
        <>
            <div className='p-2'>
                {
                    isLoading ? (
                        <>
                            <Loading />
                            <Loading />
                            <Loading />
                        </>
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
                                </div>
                                <div className='rounded w-full mt-3'>
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={1}
                                    >
                                        {
                                            post.get_media.map((media: any, key: number) => {
                                                if (media.media_type == 'video/mp4' || media.media_type == 'video/mov') {
                                                    return (
                                                        <SwiperSlide key={key}>
                                                            <video width="100%" height="100%" controls={true}>
                                                                <source
                                                                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${media.media_path}`}
                                                                    type="video/mp4"
                                                                />
                                                            </video>
                                                            <div className='h-20'>

                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                } else {
                                                    return (
                                                        <SwiperSlide key={key}>
                                                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${media.media_path}`} width={500} height={500} className='w-full' alt='media'></Image>
                                                        </SwiperSlide>
                                                    )
                                                }
                                            })
                                        }
                                    </Swiper>
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
                                No posts yet
                            </div>
                        </div>
                    )
                }
                <div className='lg:w-[25%] mx-auto p-2 flex justify-center mb-5 mt-2'>
                    {
                        page > maxPage ? null : (
                            <button className='flex items-center gap-2' onClick={e => { loadMore() }} disabled={isLoadMoreLoading}>
                                {
                                    isLoadMoreLoading ? 'Please wait...' : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                            Load More
                                        </>
                                    )
                                }
                            </button>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default PublicPost