import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const Sources = ({filename,link,pageNumber}) => {
    return (
        <div className='source-div'>
           <a href={`/pdf/${link}/${pageNumber}`} target="_blank">
                <h4 className='line-clamp-6'> {filename} </h4>
                <div>
                    <Image src='https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://vtu.ac.in//&size=128' width={20} height={20}/>
                    <p>Pg No. {pageNumber}</p>
                </div>
            </a>
        </div>
    )
}

export default Sources