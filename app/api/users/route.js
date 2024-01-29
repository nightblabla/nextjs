import { NextResponse } from 'next/server';
import conn from '../../../lib/db';

export async function GET(req, res) {
    try {
        const query = 'SELECT * FROM users';
        const result = await conn.query(query);

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error(error);

        if (!res.writableEnded) {
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
}
