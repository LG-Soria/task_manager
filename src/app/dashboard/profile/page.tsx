"use client"
import React from 'react'
import { useSession, signOut } from "next-auth/react"

function DashboardPage() {

    const { data: session, status} = useSession();

  return (
    <div>
      <button className='bg-black text-white' onClick={()=> {signOut()}}>
        Log Out
      </button>

      
      <h1 className='font-extrabold text-3xl'>{session?.user?.alias}</h1>


    <pre>
      {JSON.stringify(
        {
          session,
          status
        },null, 2
      )}
    </pre>

    </div>
  )
}

export default DashboardPage