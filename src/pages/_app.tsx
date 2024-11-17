import "@menfess/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {Toaster} from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
      <Head>
          <title>Menfess</title>
          <meta name="title" content="Menfess"/>
          <meta name="description" content="A Website to Send messages Anonymously and Securely"/>
          <meta name="keywords" content="Anonymous, Message, Confess, Secure"/>
          <meta name="robots" content="index, follow"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta name="language" content="English"/>

          <meta name="author" content="Louie"/>
          <meta name="og:title" content="Menfess"/>
          <meta name="og:description" content="A Website to Send messages Anonymously and Securely"/>
      </Head>
      <Toaster position={'bottom-right'} toastOptions={{duration: 1500}}/>
      <Component {...pageProps} />
  </>
  );
}
