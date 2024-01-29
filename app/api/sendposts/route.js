

import conn from '../../../lib/db'
export async function POST(req, res) {
    try {
        console.log("req nom", req.body);

        const query = 'INSERT INTO posts(content) VALUES($1)';
        const values = [req.body.content];

        const result = await conn.query(query, values);

        console.log("ttt", result);

        res.status(200).json({ message: 'Post request handled successfully' });
    } catch (error) {
        console.error(error);

        // Check if res object is still valid before using it
        if (!res.writableEnded) {
           // res.status(500).json({ error: 'Internal Server Error' });
            console.log(res.message);
        }
    }
}