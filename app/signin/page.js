'use client'
import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const page = () => {
  const session = useSession();
  if(session.status == 'authenticated'){
    useRouter().push('/');
  }
  return (
    <>
      <section className="min-h-screen flex items-center justify-center w-full">
        <div className="bg-white p-5 flex rounded-2xl shadow-2xl">
          <div className="px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
            {/* <p className="text-sm mt-4 text-[#002D74]">If you have an account, please login</p> */}
            {/* <form className="mt-6" action="#" method="POST">
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input type="email" name="" id="" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete='true' required />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" name="" id="" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none" required />
              </div>

              <div className="text-right mt-2">
                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
              </div>

              <button type='submit' className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden mt-4 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                    <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-orange-100 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        LOGIN
                    </span>
                </button>
            </form> */}

            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 "
            onClick={async ()=>{
              await signIn('google',{ callbackUrl: 'http://localhost:3000/signin/userInformation' });
            }} >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              <span className="ml-4">Login with Google</span>
            </button>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default page