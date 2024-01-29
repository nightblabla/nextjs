'use client';
import React from 'react'
import { signOut } from "next-auth/react";
const Button = () => {
  return (
    <div>
       <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  Signout
</button>
    </div>
  )
}

export default Button