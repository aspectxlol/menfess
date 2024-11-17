import Link from "next/link";

export default function Sent() {
  return (
    <div>
      <h1 className={'text-3xl font-bold'}>Sent!</h1>
        <p className={'text-lg'}>check out <Link href={"/confessions"} className={'underline'}>all the messages</Link>!</p>
    </div>
  );
}