"use client"
import React, { useEffect, useState } from 'react'
import toast,{Toaster} from 'react-hot-toast'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo_vtu-gpt.png'
import { signOut, useSession } from 'next-auth/react'
import axios from 'axios'

const Sidebar = () => {
    const [loading,setLoading] = useState(false)
    const [deleting,setDeleting] = useState(false)
    const [notebooks, setNotebooks] = useState([]);
    const [newNotebookName,setNewNotebookName] = useState("")
    let getNotebooks = () => {
        if (session.status == 'authenticated') {
            axios.get(`/api/notebooks?userId=${session.data.userId}`)
                .then(res => {
                    setNotebooks(res.data);
                })
        }
    };
    const session = useSession();
    const createNewNotebook = async () => {
        if(newNotebookName && session.status == 'authenticated'){
            setLoading(true)
            const resp = await axios.post('/api/createNotebook',{
                userId : session.data.userId,
                notebookName : newNotebookName
            })
            setLoading(false)
            if(resp.data.message == 'success'){
                toast.success("New Notebook created Succesfully");
                setNewNotebookName("")
                getNotebooks();
            }
            if(resp.data.message == 'failed'){
                toast.error("Error in creating new notebook")
                setNewNotebookName("")
            }
        }
    }
    useEffect(() => {
        getNotebooks();
    }, [session])
    useEffect(() => {
        document.querySelector('.mob-nav').addEventListener('click', function () {
            document.querySelector('.sidebar').style.transform = 'translateX(0px)'
        })
        document.querySelector('.close-btn').addEventListener('click', function () {
            document.querySelector('.sidebar').style.transform = 'translateX(-100%)'
        })
    })
    return (
        <>
            {loading && 
                <div className='h-screen w-full absolute z-[105] bg-gray-100/85 flex justify-center items-center flex-col'>
                    <img src="loader.webp" alt="" className='w-[250px] ' width={200} />
                    <h1 className='bold text-xl '>Creating a Notebook..</h1>
                </div>
            }
            {deleting && 
                <div className='h-screen w-full absolute z-[105] bg-gray-100/85 flex justify-center items-center flex-col'>
                    <img src="loader.webp" alt="" className='w-[250px] ' width={200} />
                    <h1 className='bold text-xl '>Deleting a Notebook..</h1>
                </div>
            }
            <div className="sidebar flex h-screen flex-col justify-between border-e">
                <Toaster/>
                <div className='close-btn sm:inline md:hidden'><i className="ri-arrow-left-double-line"></i></div>
                <div className="px-4 py-6">
                    <span className="grid h-10 w-full px-10 place-content-center rounded-lg">
                        <Link href='/'><Image className='logo' src={logo}></Image></Link>
                    </span>

                    <ul className="mt-6 space-y-1">
                        <li className='text-center mb-6'>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <p className='new-notebook'> New Notebook </p>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            <div className='border-2 border-grey-900 rounded-lg'>
                                            <input value={newNotebookName} onChange={e => setNewNotebookName(e.target.value)} type="text" className='w-full h-10 p-3 rounded-lg outline-none' placeholder='Notebook Name'/>
                                            </div>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction><button onClick={createNewNotebook}>Continue</button></AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </li>
                        <li>
                            <Link
                                href="/"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Home
                            </Link>
                        </li>
                        {notebooks.length != 0 && <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="text-sm font-medium"> Notebooks </span>

                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    {notebooks.map((notebook, index) => (
                                        <li className='flex justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
                                            <Link
                                                href={`http://localhost:3000/answer/${notebook.notebook_id}`}
                                                key={index}
                                                className=""
                                            >
                                                {notebook.notebook_name}
                                            </Link>
                                            <button onClick={async () => {
                                                setDeleting(true)
                                                await axios.post('http://localhost:3000/api/deleteNotebook',{notebookId : notebook.notebook_id})
                                                setDeleting(false)
                                                getNotebooks();
                                            }}>
                                                <img src="/deleteIcon.png" className='w-[17px]' alt="" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </li>}
                        {session.status == 'authenticated' ? <li>
                            <Link
                                href="/" onClick={(e) => {
                                    e.preventDefault();
                                    signOut('google');
                                }}
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Logout
                            </Link>
                        </li> :
                            <li>
                                <Link
                                    href="/signin"
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    Sign In
                                </Link>
                            </li>
                        }

                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="text-sm font-medium"> Account </span>

                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a
                                            href=""
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            Details
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href=""
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            Security
                                        </a>
                                    </li>

                                    <li>
                                        <form action="/logout">
                                            <button
                                                type="submit"
                                                className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                Logout
                                            </button>
                                        </form>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>

                {session.status === 'authenticated' ? <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                        <Image
                            alt="Man"
                            src={session?.data?.user?.image}
                            className="h-10 w-10 rounded-full object-cover"
                            width={30} height={30}
                        />

                        <div>
                            <p className="text-xs">
                                <strong className="block font-medium">{session.data.user?.name}</strong>

                                <span className='text-xs' style={{ fontSize: 10 }}> {session?.data?.user?.email} </span>
                            </p>
                        </div>
                    </a>
                </div> : <></>}
            </div>
            {/* Mobile Navigation   */}
            <div className='mob-nav sm:block md:hidden inline'>
                <div><i className="ri-menu-2-line"></i></div>
            </div>

        </>
    )
}

export default Sidebar