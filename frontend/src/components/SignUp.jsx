import React, { useState } from 'react';

const API_URL = 'http://localhost:3000/auth/signup';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', specialty: '', cv: null });

  const handleChange = (e) => {
    if (e.target.name === 'cv') {
      setFormData({ ...formData, cv: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formDataToSend
    });
    // Handle response (e.g., save token, redirect)
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 bg-white rounded shadow-md">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="mb-3 p-2 border border-blue-300 rounded" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="mb-3 p-2 border border-blue-300 rounded" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="mb-3 p-2 border border-blue-300 rounded" />
      <input type="text" name="specialty" placeholder="Specialty" onChange={handleChange} required className="mb-3 p-2 border border-blue-300 rounded" />
      <input type="file" name="cv" onChange={handleChange} required className="mb-3" />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Sign Up</button>
    </form>
  );
};

export default SignUp;
