'use client'
import React, { useState } from 'react';
import Link from 'next/link'
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import logo from '@/public/logo_vtu-gpt.png'
import { useSession } from 'next-auth/react';
const InputHome = ({ onAsk }) => {
  const router = useRouter();
  const session = useSession();
  const [question, setQuestion] = useState('');

  const handleAsk = () => {
    if(session.status == 'unauthenticated'){
      router.push('/signin')
      return;
    }
    if (question.trim().length != 0) {
      onAsk(question);
      router.push('/answer');
    }
  }
  return (
    <>
      <div className='w-full border-3 border-gray-900'>
      <div className='homepage-main'>
        <div className="bg-image"></div>
        <Image className='logo absolute top-5 md:hidden' src={logo}></Image>
        <h1 className="mb-4">Where Knowledge begins</h1>
        <div className='text-area-div'>
          <Textarea
            placeholder='Ask a Question...'
            className='resize-none text-area bg-transparent text-black'
            style={{ fontSize: '16px',backgroundColor: 'white',marginBottom:10, borderRadius:20,padding: 20,outline:0}}  // Adjust the font size as needed
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAsk()
            }}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Link href=''><button className='ask-btn' onClick={(e)=>{
            e.preventDefault();
            handleAsk()
          }}><i className="ri-arrow-right-line text-white" ></i></button></Link>
        </div>
        <div className='homepage-suggestions'>
          <p>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-right-to-arc" className="svg-inline--fa fa-arrow-right-to-arc icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 256c0-114.9-93.1-208-208-208c-13.3 0-24-10.7-24-24s10.7-24 24-24C397.4 0 512 114.6 512 256s-114.6 256-256 256c-13.3 0-24-10.7-24-24s10.7-24 24-24c114.9 0 208-93.1 208-208zM232.3 134.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6s-2.8 13-7.7 17.6l-112 104c-9.7 9-24.9 8.5-33.9-1.3s-8.5-24.9 1.3-33.9L266.9 280H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H266.9l-67.2-62.4c-9.7-9-10.3-24.2-1.3-33.9s24.2-10.3 33.9-1.3z"></path>
            </svg>
            Try asking
          </p>
          <Link href='/'>🪝 The best fishing spots in Canada</Link>
          <Link href='/'>🪆 The history of matryoshka dolls</Link>
          <Link href='/'>🪶 Why do we stuff pillows with feathers?</Link>
          <Link href='/'>🪡 The best ateliers in Paris</Link>
        </div>
      </div>
      </div>
    </>


  )
}

export { InputHome };