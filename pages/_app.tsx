import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>yipp</title>
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
