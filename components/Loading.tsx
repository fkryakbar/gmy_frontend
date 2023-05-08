import React from 'react'

function Loading() {
    return (
        <div className='lg:w-[25%] mx-auto rounded bg-white drop-shadow p-2 mt-3'>
            <div className='flex gap-3'>
                <div className='h-8 bg-slate-100 rounded-full w-8'>
                </div>
                <div className='h-8 bg-slate-100 rounded w-full'>

                </div>
            </div>
            <div className='h-56 bg-slate-100 rounded w-full mt-3'>

            </div>
            <div className='h-4 mt-3 bg-slate-100 rounded w-full'>

            </div>
            <div className='h-4 mt-1 bg-slate-100 rounded w-[70%]'>

            </div>
            <div className='h-4 mt-1 bg-slate-100 rounded w-[30%]'>

            </div>
        </div>
    )
}

export default Loading