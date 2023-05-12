import Image from "next/image";
import { useState } from "react"

function MediaSlides({ data }: { data: Array<any> }) {
    const [slide, setSlide] = useState(0);
    const media: any = data

    const media_total = media.length

    const nextSlide = () => {
        setSlide((current) => {
            if (current + 1 < media_total) {
                return current + 1
            }
            return current
        })
    }


    const prevSlide = () => {
        setSlide((current) => {
            if (current != 0) {
                return current - 1
            }
            return current
        })
    }
    return (
        <>
            <div className="relative">
                {
                    media_total > 1 ? (
                        <>
                            <div className="bg-slate-900 bg-opacity-40 text-white rounded-full p-2 text-xs absolute right-[5%] top-[2%]">
                                <span className="opacity-100">
                                    {slide + 1}/{media_total}
                                </span>
                            </div>
                            <button onClick={prevSlide} className="bg-slate-900 bg-opacity-40 rounded-full p-2 absolute text-white top-[50%] left-[5%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button onClick={nextSlide} className="bg-slate-900 bg-opacity-40 rounded-full p-2 absolute text-white top-[50%] right-[5%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </>
                    ) : null
                }
                {
                    media[slide].media_type == 'video/mp4' || media[slide].media_type == 'video/mov' ? (
                        <>
                            <video width="100%" height="100%" controls={true}>
                                <source
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${media[slide].media_path}`}
                                    type="video/mp4"
                                />
                            </video>
                            <div className='h-20'>

                            </div>
                        </>
                    ) : (
                        <>
                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${media[slide].media_path}`} width={500} height={500} className='w-full' alt='media'></Image>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default MediaSlides