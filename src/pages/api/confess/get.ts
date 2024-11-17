// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const prisma = new PrismaClient();
    prisma.$connect();

    const data = await prisma.message.findMany();

    res.status(200).json(data);
    prisma.$disconnect();

}
