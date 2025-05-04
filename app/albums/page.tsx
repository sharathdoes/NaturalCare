"use client"
import React from 'react'
async function Albums  () {
    const response= await fetch('https://jsonplaceholder.typicode.com/albums')
   const data= await response.json()


  return (
    <div>
        <h1>ALbums are: </h1>
        {
            data.map((album:any)=>
                (
                    <div> the id is {album.id} and the title is {album.title}</div>
                )
            )
        }
    </div>
  )
}

export default Albums