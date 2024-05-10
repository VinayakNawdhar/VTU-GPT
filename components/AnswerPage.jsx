'use client';
import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addAnswer, showAnswer } from '@/provider/redux/Answer';
import { handleAsk } from '@/utils/handleAsk.js'
import { useState } from 'react';
import ReactLoading from 'react-loading';
import Source from '@/components/ui/Sources';
import Skeleton from '@/components/ui/Skeleton';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import YoutubeCard from '@/components/ui/YoutubeCard';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';


const AnswerPage = ({ notebookId, notebookName }) => {
    const session = useSession();
    const dispatch = useDispatch()
    const [hasRunOnce, setHasRunOnce] = useState(false);
    useEffect(() => {
        setNewNotebookName(notebookName)
        const checkForQuestions = async () => {
            if (session.status == 'authenticated' && notebookId && !hasRunOnce) {
                setRetrieving(true)
                axios.get(`http://localhost:3000/api/questions?notebookId=${notebookId}`)
                    .then(res => {
                        const arr = res.data;
                        if (arr.length != 0) {
                            arr.forEach(ques => {
                                dispatch(showAnswer({
                                    notebookId: notebookId,
                                    question: ques.question,
                                    answer: ques.answer,
                                    sources: JSON.parse(ques.sources),
                                    id: ques.question_id,
                                    youtube: JSON.parse(ques.youtube)
                                }))
                            })
                        }
                        setHasRunOnce(true)
                        setRetrieving(false)
                    })

            }
        }
        checkForQuestions();
    }, [])
    const [newNotebookName, setNewNotebookName] = useState("")
    const [question, setquestion] = useState("")
    const [loading, setLoading] = useState(false);
    const [retrieving, setRetrieving] = useState(false);
    const scrollTolast = () => {
        const answerBoxEl = document.querySelector('.answer-box');
        answerBoxEl.scrollTop = answerBoxEl.scrollHeight;
    }

    let answerList = useSelector((store) => store.qna.content)
    const [clicked, setClicked] = useState(false)
    const submitHandler = async (e) => {
        let id = await dispatch(addAnswer({
            question: question,
            answer: '',
            notebookId: notebookId
        }))
        id = id.payload;
        setquestion('');
        setLoading(true);
        scrollTolast();
        e.target.blur();
        const resp = await handleAsk(question);
        console.log(resp)
        await dispatch(addAnswer({ ...resp, id }));
        if (session.status == "authenticated" && notebookId) {
            await axios.post('/api/uploadingAnswer', {
                id: id,
                question: resp.question,
                answer: resp.answer,
                sources: resp.sources,
                userId: session.data.userId,
                notebookId: notebookId,
                youtube: resp.youtube
            })
        }
        setLoading(false);
        scrollTolast();
    }
    return (
        <>
            {!notebookId &&
                <motion.div className='modal-window h-screen w-full bg-black/70 absolute z-[100] flex justify-center items-center'
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: clicked == false ? 1 : 0, opacity: clicked == false ? 100 : 0 }}
                    transition={{ type: 'just' }}
                >
                    <div className='bg-gray-300 px-10 py-8 rounded-3xl shadow-lg shadow-gray-600 text-center'>
                        <h1>If you want to save your questions, kindly create a notebook.</h1>
                        <button onClick={() => {
                            document.querySelector('.modal-window').style.display = 'none';
                        }} className='px-3 py-1 bg-gray-800 text-gray-50 rounded-full mt-5'>Okay</button>
                    </div>
                </motion.div>}
            <div className="answer-container">
                {retrieving &&
                    <div className='h-screen w-full absolute z-[99] bg-gray-100 flex justify-center items-center flex-col'>
                        <img src="/loader.webp" alt="" className='w-[250px] ' width={200} />
                        <h1 className='bold text-xl '>Retrieving all questions..</h1>
                    </div>
                }
                <div className='answer-box flex flex-row justify-center'>
                    <div className='flex flex-col w-full'>
                        <div className="answer-submenu-container flex justify-between py-7 px-5 relative z-10">
                            <input
                                className='notebook-name-box p-2 bg-inherit outline-none focus:outline-1'
                                value={newNotebookName}
                                onChange={(e) => setNewNotebookName(e.target.value)}
                            />
                            <button
                                type="button"
                                className="bg-gray-600 text-white hover:opacity-80 font-sans focus:outline-none transition duration-300 ease-in-out select-none items-center justify-center rounded cursor-pointer active:scale-95 whitespace-nowrap inline-flex text-sm px-4 font-medium h-8 absolute right-2"
                            >
                                <div className="flex items-center">
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="lock"
                                        className="w-4 inline"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path fill="currentColor" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h80V512H0V192H80z"></path>
                                    </svg>
                                    <div className="ml-2">Share</div>
                                </div>
                            </button>
                        </div>

                        <div className="w-4/5 md:w-3/5 mx-auto mt-16 pb-12 relative">
                            {answerList.filter(ques => ques.notebookId == notebookId) == 0 ? <h1 className='text-4xl absolute top-72 w-full text-center text-gray-400'>No question in this Notebook...</h1> : ""}
                            {
                                answerList.filter(ques => ques.notebookId == notebookId).map((el, index) => (
                                    el.notebookId == notebookId && <>
                                        <h3 key={el.id} className='question' style={{ fontWeight: 600 }}>{(index + 1) + ".  " + el.question}</h3>
                                        <div className='subanswer-div'>
                                            <h1 className='flex gap-2'><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="align-left" className="svg-inline--fa fa-align-left fa-fw w-4 inline" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M24 40C10.7 40 0 50.7 0 64S10.7 88 24 88H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zm0 128c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM0 320c0 13.3 10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zM24 424c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"></path></svg><span>Answer</span></h1>
                                            {el.answer ? <p key={el.id} className='answer' style={{ whiteSpace: 'break-spaces' }}>{el.answer}</p> :
                                                <Skeleton />}
                                        </div>
                                        <div className="source-container">
                                            {el.sources.length != 0 && <h1 className='flex gap-2'><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="list-timeline" className="svg-inline--fa fa-list-timeline fa-fw w-4 inline" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M219.9 112H400V80H219.9l-16 16 16 16zm-72.6-4.7c-6.2-6.2-6.2-16.4 0-22.6l43.3-43.3c6-6 14.1-9.4 22.6-9.4H416c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H213.3c-8.5 0-16.6-3.4-22.6-9.4l-43.3-43.3zM64 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0 160a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 416a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm187.9 16H400V400H219.9l-16 16 16 16zm-72.6-4.7c-6.2-6.2-6.2-16.4 0-22.6l43.3-43.3c6-6 14.1-9.4 22.6-9.4H416c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H213.3c-8.5 0-16.6-3.4-22.6-9.4l-43.3-43.3zM203.9 256l16 16H464V240H219.9l-16 16zm-13.3 54.6l-43.3-43.3c-6.2-6.2-6.2-16.4 0-22.6l43.3-43.3c6-6 14.1-9.4 22.6-9.4H480c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H213.3c-8.5 0-16.6-3.4-22.6-9.4z"></path></svg><span>Sources</span></h1>}
                                            <div className='py-4'>
                                                {/* <Source link="public/documents/Module 1 [www.vtuloop.com] (1).pdf" filename="BDA Module 1" /> */}
                                                {el.sources && el.sources.map(source => (
                                                    <Source link={source.metadata.source.split("documents")[1]} filename={source.metadata.source.split("\\")[1].slice(0, 10) + "..."} pageNumber={source.metadata.page} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="source-container">
                                            {el.youtube && el.youtube.length != 0 && <h1 className='flex gap-2'><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="list-timeline" className="svg-inline--fa fa-list-timeline fa-fw w-4 inline" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M219.9 112H400V80H219.9l-16 16 16 16zm-72.6-4.7c-6.2-6.2-6.2-16.4 0-22.6l43.3-43.3c6-6 14.1-9.4 22.6-9.4H416c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H213.3c-8.5 0-16.6-3.4-22.6-9.4l-43.3-43.3zM64 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0 160a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 416a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm187.9 16H400V400H219.9l-16 16 16 16zm-72.6-4.7c-6.2-6.2-6.2-16.4 0-22.6l43.3-43.3c6-6 14.1-9.4 22.6-9.4H416c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H213.3c-8.5 0-16.6-3.4-22.6-9.4l-43.3-43.3zM203.9 256l16 16H464V240H219.9l-16 16zm-13.3 54.6l-43.3-43.3c-6.2-6.2-6.2-16.4 0-22.6l43.3-43.3c6-6 14.1-9.4 22.6-9.4H480c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H213.3c-8.5 0-16.6-3.4-22.6-9.4z"></path></svg><span>Youtube Videos</span></h1>}
                                            <div className='py-4 flex justify-center'>
                                                {el.youtube && el.youtube.map((vdo, index) => (
                                                    <YoutubeCard title={vdo.title} id={vdo.video_id} imgAddress={vdo.thumbnail_url} index={index} />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>


                    <div className="fixed bottom-8 w-10/12 md:w-3/5 m-auto flex items-center p-2 bg-white rounded-xl border focus:outline-none focus:ring focus:border-blue-300">
                        <input
                            type="text"
                            placeholder="Ask Follow Up...."
                            className="flex-grow p-2 focus:outline-none"
                            value={question}
                            onChange={(e) => setquestion(e.target.value)}
                            onKeyDown={async (e) => {
                                if (e.key === 'Enter') {
                                    if (question) {
                                        submitHandler(e);
                                    }
                                }
                            }}
                        />
                        <button
                            className="follow-ask-btn flex items-center justify-center text-white bg-black rounded-3xl "
                            onClick={async (e) => {
                                if (question) {
                                    submitHandler(e);
                                }
                            }}
                        >
                            {loading ? (
                                <div>
                                    <ReactLoading type='spin' color='white' height={'20px'} width={'20px'} />
                                </div>
                            ) : (
                                <i className="ri-arrow-right-line" style={{ fontSize: '20px' }}></i>
                            )}

                        </button>
                    </div>


                    {/* Follow-up question section ends */}

                </div>
            </div>
        </>


    )
}

export default AnswerPage