import { NextResponse } from 'next/server';
import conn from '../../../lib/db';
export async function POST(req, res) {
    try{
    const s= await req.json();
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [s["email"], s["password"]];
    const result = await conn.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      return {
        id: user.id,
        email: user.email,
        username: user.user_name,
      };
    } else {
      // If no user is found, return null
      return null;
    }
  } catch (error) {
    // Handle any database query errors
    console.error('Error checking user credentials:', error);
    return null;
  }
}