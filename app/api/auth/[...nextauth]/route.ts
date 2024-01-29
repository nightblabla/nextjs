import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

const yourApiRouteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method === 'GET' || req.method === 'POST') {
        await handler(req, res);
      } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export default yourApiRouteHandler;