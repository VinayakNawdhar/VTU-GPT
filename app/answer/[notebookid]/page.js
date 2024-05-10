import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AnswerPage from '@/components/AnswerPage'
import { sql } from '@vercel/postgres'
import { getServerSession } from 'next-auth';
import React from 'react'

const getNotebookName = async (notebookId) => {
  const resp = await sql`select notebook_name,uid from notebooks where notebook_id=${notebookId}`;
  return resp.rows
}

const page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const notebookName = await getNotebookName(params.notebookid);
  if (session && notebookName.length != 0 && notebookName[0].uid == session.userId) {
    return (
      <>
        <AnswerPage notebookId={params.notebookid} notebookName={notebookName[0].notebook_name} />
      </>
    )
  } else {
    return (
      <>
        <div className='w-full h-full flex justify-center items-center'>
          <h1 className='text-xl'>You are not allowed to access this notebook.</h1>
        </div>
      </>
    )
  }

}

export default page