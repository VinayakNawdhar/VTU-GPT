import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='flex w-full'>
    <Sidebar/>
    {children}
    </div>
  )
}

export default layout