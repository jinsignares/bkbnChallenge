import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../redux/store'
import Layout from '../components/Layout'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(MyApp)


