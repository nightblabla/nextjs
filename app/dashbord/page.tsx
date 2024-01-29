// pages/users.js
'use client';
// pages/users.js
import { useEffect, useState } from 'react';

interface User {
    id: number;
    email: string;
    user_name: string;
    password: string;
    // Add other properties as needed
}

async function GetQuotes() {
    try {
        const response = await fetch('/api/users', {
            method: 'GET'
        });
        const users = await response.json();
        console.log('in here', users);
        return users;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await GetQuotes();
            setUsers(usersData);
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border bg-gray-200 p-2">ID</th>
                        <th className="border bg-gray-200 p-2">Email</th>
                        <th className="border bg-gray-200 p-2">Username</th>
                        <th className="border bg-gray-200 p-2">Password</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.user_name}</td>
                            <td className="border p-2">{user.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
