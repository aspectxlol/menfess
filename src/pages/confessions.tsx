import {PrismaClient} from "@prisma/client";
import {InferGetServerSidePropsType} from "next";
import Link from "next/link";

export default function Confessions({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1 className={'text-3xl font-bold'}>Confessions</h1>
        {data.length === 0 && <p className={'text-lg'}>No confessions yet! <Link href={'/'} className={'underline'}>Send One!</Link></p>}
        <div
            className={'grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-2'}
        >
            {data.map((message) =>
            {
                return (
                    <div key={message.id} className={'flex flex-col justify-between bg- border-2 p-4 rounded-lg w-56'}>
                        <p className={'text-lg font-bold'}>{message.message}</p>
                        <p className={'text-sm'}>from {message.from} to {message.to}</p>
                    </div>
                )
            }
            )}
        </div>
    </div>
  );
}

export async function getServerSideProps(): Promise<{ props: { data: { message: string, id: string, from: string, to: string, createdAt: string }[] } }> {
    const prisma = new PrismaClient();
    await prisma.$connect();

    try {
        const data = await prisma.message.findMany();
        const formattedData = data.map(message => ({
            ...message,
            createdAt: message.createdAt.toISOString(),
        }));

        return {
            props: {
                data: formattedData,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                data: [],
            },
        };
    } finally {
        await prisma.$disconnect();
    }
}