//'use client'
import React from 'react';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Button from './Button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Header = async () => {
  const session = await getServerSession(authOptions);
  console.log('session is in navbar ', session);
  return (
    <nav className="bg-blue-800 flex justify-between items-center h-20 p-4">
      {session ? (
         <Button></Button>
      ) : (
        <Link href={"/login"} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</Link>
      )}
      {/* <button onClick={()=> signOut()}>salidhjfhjsdfhdsj</button> */}
      
    </nav>
  );
};

export default Header;
