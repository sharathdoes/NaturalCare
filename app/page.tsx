"use client"
import React from 'react'
import Hello from '@/components/hello'
function page() {
  console.log("Im client")
  return (
    <div><Hello/></div>
  )
}

export default page