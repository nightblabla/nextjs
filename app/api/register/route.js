
// // // import conn from '../../../lib/db'

// // // export default async function   POST(req, res) {
    
// // //     try {
// // //         console.log("req nom", req.body)
// // //         const query = 'INSERT INTO posts(content) VALUES($1)'
// // //         const values = [req.body.content]
// // //       const result = await conn.query(
// // //           query,
// // //           values
// // //       );
// // //       console.log( "ttt",result );
// // //   } catch ( error ) {
// // //       console.log( error );
// // //   }
  
  
// // // };
// // import { handlePost } from './handler';  // Import the handler function
// // import conn from '../../../lib/db'
// // export function GET(req, res) {
// //   // Handle GET method
// //   res.status(200).json({ message: 'GET request handled' });
// // }

// // export async function POST(req, res) {
// //   // Handle POST method
// //   try {
// //     console.log("req nom", req.body)
// //     const query = 'INSERT INTO posts(content) VALUES($1)'
// //     const values = [req.body.content]
// //     const result = await conn.query(
// //         query,
// //         values
// //     );
// //     console.log( "ttt", result );
// //     res.status(200).json({ message: 'Post request handled successfully' });
// // } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// // }
// // }
// import { Console } from 'console';
// import conn from '../../../lib/db';

// export async function POST(req, res) {
//     try {
        
//         console.log("req nom", req.body);

//         // Assuming 'users' is the table name with columns: email, username, password, id
//         const query = 'INSERT INTO users(email, user_name, password) VALUES($1, $2, $3) RETURNING id';
//         console.log("this is the search",req.body.email, req.body.username, req.body.password)
//         const values = [req.body.email, req.body.username, req.body.password];
//         console.log("values is",values);

//         const result = await conn.query(query, values);

//         console.log("ttt", result);

//         // Assuming the 'id' is returned by the query and you want to include it in the response
//         //res.status(200).json({ message: 'Post request handled successfully', userId: result.rows[0].id });
//     } catch (error) {
//         console.error(error);

//         // Check if res object is still valid before using it
//         if (!res.writableEnded) {
//            // res.status(500).json({ error: 'Internal Server Error' });
//             console.log(res.message);
//         }
//     }
// }
import { NextResponse } from 'next/server';
import conn from '../../../lib/db';
//import express from 'express';

//const app = express();
//app.use(express.json()); // Add this line to parse JSON in the request body


// var app = require('express')();
// var bodyParser = require('body-parser');

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); 
// for parsing application/x-www-form-urlencoded
export async function POST(req, res) {
    try {
        const s= await req.json();
        console.log("s is",s["email"]);
        const emailquery = 'SELECT * FROM users WHERE email = $1';
        const emailCheckResult = await conn.query(emailquery, [s["email"]]);

        if (emailCheckResult.rows.length > 0) {
            // Email already exists, return an error response
            console.log("it is in");
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }

        //console.log("body is the dnwekt ", toStrings);
       // console.log("req nom", req.body);

        // Assuming 'users' is the table name with columns: email, username, password, id
        const query = 'INSERT INTO users(email, user_name, password) VALUES($1, $2, $3) RETURNING id';
        console.log("this is the search",req.body.email, req.body.username, req.body.password)
        const values = [s["email"], s["username"], s["password"]];
        console.log("values is",values);

        const result = await conn.query(query, values);

        console.log("ttt", result);

        // Assuming the 'id' is returned by the query and you want to include it in the response
        // res.status(200).json({ message: 'Post request handled successfully', userId: result.rows[0].id });
        return NextResponse.json({ message: 'Post request handled successfully', userId: result.rows[0].id },{status:200});
    } catch (error) {
        console.error(error);

        // Check if res object is still valid before using it
        if (!res.writableEnded) {
            // res.status(500).json({ error: 'Internal Server Error' });
            return NextResponse.json({ message: 'Internal Server Error'},{status:500});
            console.log(res.message);
        }
    }
}