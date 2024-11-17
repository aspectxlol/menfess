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

    const myData: { from: string, to: string, message: string, color: string } = JSON.parse(req.body);

    if(!myData.from) {
        res.status(400).json({error: 'Missing required field: from'});
        return;
    }
    if(!myData.to) {
        res.status(400).json({error: 'Missing required field: to'});
        return;
    }
    if(!myData.message) {
        res.status(400).json({error: 'Missing required field: message'});
        return;
    }
    if(!myData.color) {
        res.status(400).json({error: 'Missing required field: color'});
        return;
    }


    const prisma = new PrismaClient();
    prisma.$connect();

    const data = await prisma.message.create({
        data: {
            from: myData.from,
            to: myData.to,
            message: myData.message,
            color: myData.color
        }
    });

    res.status(200).json({ ...data });
    prisma.$disconnect();
}
