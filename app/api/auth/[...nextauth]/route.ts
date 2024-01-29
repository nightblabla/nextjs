import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export const GET = (req: Request, res: Response) => handler(req, res);
export const POST = (req: Request, res: Response) => handler(req, res);