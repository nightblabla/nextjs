import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

// export const GET = (req: NextApiRequest, res: NextApiResponse) => handler(req, res);
// export const POST = (req: NextApiRequest, res: NextApiResponse) => handler(req, res);
export const otherHandler =async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET' || req.method === 'POST') {
      await handler(req, res);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };