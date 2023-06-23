"use client"
import React from 'react'
import { useSession } from "next-auth/react"

function DashboardPage() {

    const { data: session, status} = useSession();
    console.log(session, status)

  return (
    <div>Estas registrado.</div>
  )
}

export default DashboardPage