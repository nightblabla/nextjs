import conn from '../../../lib/db';
//export { default as post } from './post';
export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        // Respond to OPTIONS request
        res.status(200).end();
        return;
    }
    if (req.method === 'POST') {
        await handlePost(req, res);
    } else {
        console.log(req.method);
        res.status(405).end(); // Method Not Allowed
    }
}

async function handlePost(req, res) {
    try {
        console.log("req nom", req.body)
        const query = 'INSERT INTO posts(content) VALUES($1)'
        const values = [req.body.content]
        const result = await conn.query(
            query,
            values
        );
        console.log( "ttt", result );
        res.status(200).json({ message: 'Post request handled successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}