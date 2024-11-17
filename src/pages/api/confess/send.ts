// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method !== 'POST') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }
    const prisma = new PrismaClient();
    prisma.$connect();

    const data = await prisma.message.create({
        data: {
            from: req.body.from,
            to: req.body.to,
            message: req.body.message
        }
    });

    res.status(200).json({ ...data });
    prisma.$disconnect();
}
