import "@menfess/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {Toaster} from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
      <Head>
        <title>Menfess</title>
        <meta name="description" content="A simple, secure, and anonymous way to send and receive messages."/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Toaster position={'bottom-right'} toastOptions={{ duration: 1500 }}/>
      <Component {...pageProps} />
  </>
  );
}
