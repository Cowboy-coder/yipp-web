import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>yipp</title>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.css"
        />
      </Head>
      <Script
        data-domain="yipp.dev"
        src="https://plausible.io/js/plausible.js"
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
