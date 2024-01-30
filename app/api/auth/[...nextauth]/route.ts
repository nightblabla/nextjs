import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)
type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;
export const GET = (req: CombineRequest, res: CombineResponse) => handler(req, res);
export const POST = (req: CombineRequest, res: CombineResponse) => handler(req, res);