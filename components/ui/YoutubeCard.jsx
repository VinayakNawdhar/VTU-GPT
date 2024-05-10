'use client'
import React from 'react'

const YoutubeCard = ({title,id,imgAddress,index}) => {
    return (
        <>
            <a href={`https://youtube.com/watch?v=${id}`} key={index} target='_blank' class="block relative p-6 w-[210px] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 bg-ur">
                <img src={imgAddress} alt="" className='w-full h-full absolute top-0 left-0 opacity-20 hover:opacity-50 transition-all blur-sm' />
                <h5 class="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">{title.slice(0,70) + "..."}</h5>
            </a>
        </>
    )
}

export default YoutubeCard