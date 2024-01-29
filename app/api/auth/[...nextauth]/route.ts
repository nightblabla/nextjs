import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

// export const GET = (req: NextApiRequest, res: NextApiResponse) => handler(req, res);
// export const POST = (req: NextApiRequest, res: NextApiResponse) => handler(req, res);
export default async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
    await handler(req, res);
  }