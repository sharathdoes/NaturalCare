"use client"
import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
const EditProfile = () => {
  const { user: contextUser } = useUser();
    const router = useRouter();
    const {setUser} = useUser();
  const [formData, setFormData] = useState({
    email: contextUser?.email || '',
    username: contextUser?.username || '',
    bio: contextUser?.bio || '',
    educationalBackground: contextUser?.educationalBackground || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/edit',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={contextUser?.email || ''}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder={contextUser?.username || ''}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder={contextUser?.bio || ''}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Educational Background</label>
          <input
            type="text"
            name="educationalBackground"
            value={formData.educationalBackground}
            onChange={handleChange}
            placeholder={contextUser?.educationalBackground || ''}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
