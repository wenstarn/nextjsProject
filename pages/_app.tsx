import '@styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { SSRProvider } from 'react-bootstrap'
import type { AppProps } from 'next/app'
import { wrapper } from '@services/store'
import Layout from '@components/Layout'

function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  )
}

export default wrapper.withRedux(App)
