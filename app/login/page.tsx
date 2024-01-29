'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
    const router = useRouter();
    const checkUserCredentials =async (email:any, password:any)=>{
        try{
      
      
          const response = await fetch(`/api/login`, {
            method: 'POST',
           
             body: JSON.stringify({
               email: email,
        
               password: password,
             }),
             headers: {
               'Content-Type': 'application/json',
      
            },
           });
          //console.log("response is ",{ response });
          const data = await response.json();
          return data
          }  
            
       catch (error) {
            
      
            console.log(error);
            return null
      
      }
      }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // eslint-disable-next-line react-hooks/rules-of-hooks
        
        const formData = new FormData(e.currentTarget);
        console.log(formData.get('password'));
        try
        {const signinData= await signIn('credentials',{
            username:formData.get('email'),
            password: formData.get('password'),
            redirect: false, 
        });
        console.log(signinData?.status===200);
        if(signinData?.status===200){

            //const s= await signinData.status;
            console.log(signinData);
            router.push('/dashbord');
            
           
        }
        //router.push('/signup');
    }
        catch(error){console.log("error: ", error); }
             
       };

        


    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="bg-white p-8 rounded shadow-md max-w-xl w-full mx-auto">
    <h2 className="text-4xl font-bold text-blue-500 mb-4">Login</h2>

    <form onSubmit={handleSubmit} className="mb-4">
      <label htmlFor="email" className="block text-blue-500 text-lg font-bold mb-2">Email:</label>
      <input name="email" type="text" placeholder="Email" required className="block w-full p-2 border border-blue-500 rounded mb-2" />

      <label htmlFor="password" className="block text-blue-500 text-lg font-bold mb-2">Password:</label>
      <input name="password" type="password" placeholder="Password" required className="block w-full p-2 border border-blue-500 rounded mb-2" />

      <input type="submit" value="Login" className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-700" />
    </form>

    <Link href="/signup" className="text-blue-500 hover:underline">
      Sign up here
    </Link>
  </div>
</div>
    );
};

export default LoginPage;


