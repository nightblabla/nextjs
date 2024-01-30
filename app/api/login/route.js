// import { NextResponse } from 'next/server';
// import conn from '../../../lib/db';
// export async function POST(req, res) {
//     try{
//     const s= await req.json();
//     const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
//     const values = [s["email"], s["password"]];
//     const result = await conn.query(query, values);

//     if (result.rows.length > 0) {
//       const user = result.rows[0];
//       return {
//         id: user.id,
//         email: user.email,
//         username: user.user_name,
//       };
//     } else {
//       // If no user is found, return null
//       return null;
//     }
//   } catch (error) {
//     // Handle any database query errors
//     console.error('Error checking user credentials:', error);
//     return null;
//   }
// }
import { NextResponse } from 'next/server';
import conn from '../../../lib/db';

export async function POST(req, res) {
  try {
    const requestData = await req.json();
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [requestData.email, requestData.password];
    const result = await conn.query(query, values);

    if (result.rows.length > 0) {
      // If user is found, you can set a session or respond accordingly
      const user = result.rows[0];
      const responsePayload = {
        id: user.id,
        email: user.email,
        username: user.user_name,
      };

      // You may want to set a session or return some other response
      // Example: set session
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
      // If no user is found, return an appropriate response
      return new NextResponse({
        status: 401, // Unauthorized
        body: JSON.stringify({ error: 'Invalid credentials' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    // Handle any database query errors
    console.error('Error checking user credentials:', error);
    return new NextResponse({
      status: 500, // Internal Server Error
      body: JSON.stringify({ error: 'Internal Server Error' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
