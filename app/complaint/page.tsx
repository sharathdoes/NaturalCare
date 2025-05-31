"use client"

import React, {useState} from 'react'

const Complaint = () => {
    const [complaint, setComplaint] = React.useState('');
const handleSubmit = () => async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaint.trim()) {
        alert("Please enter a complaint");
        return;
    }
    console.log("Complaint submitted:", complaint);
}
  return (
    <div className='items-center justify-center min-g-screen overflow-hidden'>
        <h1>Raise your Voice</h1>
        <form  onSubmit={handleSubmit()}className='flex flex-col items-center justify-center'>
            <label htmlFor="complaint" className='text-lg'>Complaint</label>
            <textarea id="complaint"  value={complaint} onChange={(e)=>setComplaint(e.target.value)} name="complaint" className='border rounded-md p-2 w-full max-w-md' placeholder='Describe your complaint here...'></textarea>
            <button type="submit" className='bg-teal-600 text-white py-2 px-4 rounded-lg mt-4'>Submit Complaint</button>

        </form>
    </div>
  )
}

export default Complaint