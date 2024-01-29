"use client";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import axios from 'axios';

import { FormEvent } from 'react';

const SignupPage = () => {
    const [passwordError, setPasswordError] = React.useState<string | null>(null);
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const isEmailValid = (email: string): boolean => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
       
        const email = formData.get('email') as string;
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const passwordAgain = formData.get('passwordagain') as string;
    
        if (!isEmailValid(email)) {
            setEmailError('Invalid email address');
            return;
          } else {
            setEmailError(null); // Clear the email error if it was previously set
          }
      
          // Additional password validation
          if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
          } else {
            setPasswordError(null); // Clear the password error if it was previously set
          }
      
          if (password !== passwordAgain) {
            setPasswordError('Passwords do not match');
            return;
          } else {
            setPasswordError(null); // Clear the password error if it was previously set
          }
    
       try{


           const response = await fetch(`/api/register`, {
             method: 'POST',
            
              body: JSON.stringify({
                email: formData.get('email'),
                username:formData.get("username"),
                password: formData.get('password'),
              }),
              headers: {
                'Content-Type': 'application/json',
    
             },
            });
           //console.log("response is ",{ response });
           const data = await response.json();
           console.log("Response message:", data.message);
           console.log("User ID:", data.userId);
           console.log(formData.get('email'));
           if(data.error==='Email already exists'){
                setEmailError('Email already exists');
           }  

       } catch (error) {
             console.log(error);
       
    }
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
  <div className="mb-6">
    <label htmlFor="email" className="block text-blue-500 text-lg font-bold mb-2">Email:</label>
    <input
      className="w-full py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
      id="email"
      name="email"
      type="text"
      placeholder="ex@example.com"
      required
    />
    {emailError && (
      <div className="text-red-500 text-sm mt-1">
        {emailError}
      </div>
    )}
  </div>

  <div className="mb-6">
    <label htmlFor="username" className="block text-blue-500 text-lg font-bold mb-2">Username:</label>
    <input
      className="w-full py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
      id="username"
      name="username"
      type="text"
      placeholder="username"
      required
    />
  </div>

  <div className="mb-6">
    <label htmlFor="password" className="block text-blue-500 text-lg font-bold mb-2">Password:</label>
    <input
      className="w-full py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
      id="password"
      name="password"
      type="password"
      placeholder="password"
      required
    />
    {passwordError && (
      <div className="text-red-500 text-sm mt-1">
        {passwordError}
      </div>
    )}
  </div>

  <div className="mb-6">
    <label htmlFor="passwordagain" className="block text-blue-500 text-lg font-bold mb-2">Password Again:</label>
    <input
      className="w-full py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
      id="passwordagain"
      name="passwordagain"
      type="password"
      placeholder="password again"
      required
    />
    {passwordError && (
      <div className="text-red-500 text-sm mt-1">
        {passwordError}
      </div>
    )}
  </div>

  <div className="flex items-center justify-center flex-col">
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
    >
      Signup
    </button>
    <Link href="/login" className="text-blue-500 hover:underline">
      Already have an Account
    </Link>
  </div>
</form>

    );
}

export default SignupPage

function setError(arg0: string) {
    throw new Error('Function not implemented.');
}
 // let data={email: formData.get('email'),
        //     username: formData.get("username"),
        //     password: formData.get('password')}
        // console.log("datais",data);
        // axios.post('/api/register',data
        // ).then((response )=>{
        //     console.log("axios response",response);
        // }).catch( console.error)