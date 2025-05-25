"use client"
import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
const EditProfile = () => {
  const { user: contextUser } = useUser();
    const router = useRouter();
    const {setUser} = useUser();
  const [formData, setFormData] = useState({
    email: contextUser?.email || '',
    username: contextUser?.username || '',
    bio: contextUser?.bio || '',
    educationalBackground: contextUser?.educationalBackground || '',
    isDoctor: contextUser?.isDoctor || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log("calling api")
      const response = await fetch('/api/user/edit',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data=await response.json();
        setUser(data.user);
          router.push('/profile');

      }
      else {
        const data = await response.json();
        console.log('Profile updated:', data);
        // Optionally, update the context user state here
        // 
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder={contextUser?.username || ''}
            className="w-full p-2  text-sm border border-gray-200  rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder={contextUser?.bio || ''}
            className="w-full text-sm h-32 p-2 border border-gray-200 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Educational Background</label>
           <Textarea
            name="educationalBackground"
          value={formData.educationalBackground}
          onChange={handleChange}
          className="rounded-lg border text-sm border-gray-200 h-32  focus:ring-teal-500 py-2 px-2 w-full text-black tetx-sm"
          placeholder={contextUser?.educationalBackground || ''}
        ></Textarea>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isDoctor"
            checked={formData.isDoctor}
            onChange={(e) => setFormData(prev => ({ ...prev, isDoctor: e.target.checked }))}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
          />
          <label className="text-sm">I am a doctor</label>
          </div>
           
        <button
          type="submit"
          className="w-full bg-teal-700 text-white  text-sm py-2 rounded-sm"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
