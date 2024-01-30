import { NextResponse } from 'next/server';
import conn from '../../../lib/db';

export async function POST(req, res) {
  try {
    const requestData = await req.json();
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [requestData.email, requestData.password];
    const result = await conn.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const responsePayload = {
        id: user.id,
        email: user.email,
        username: user.user_name,
      };

     
      req.session.set('user', responsePayload);
      await req.session.save();

      return new NextResponse({
        status: 200,
        body: JSON.stringify(responsePayload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      
      return new NextResponse({
        status: 401, 
        body: JSON.stringify({ error: 'Invalid credentials' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
   
    console.error('Error checking user credentials:', error);
    return new NextResponse({
      status: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
