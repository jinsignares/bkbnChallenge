import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../redux/store'
import Layout from '../components/Layout'
import { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BKBN Challenge: Contacts API</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
  
}

export default wrapper.withRedux(MyApp)


