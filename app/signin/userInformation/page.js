import Postsignin from '@/components/Postsignin'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'
const page = async () => {
  const session = await getServerSession(authOptions)
  const response = await sql`select * from Users where Email = ${session.user.email}`;
  if(response.rows.length > 0){
    redirect('/')
  }else{
    return (
      <Postsignin/>
    )
  }
  
}

export default page