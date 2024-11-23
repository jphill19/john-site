import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import { emotionCache } from '../lib/emotion-cache'
import Layout from '../components/layouts/main'
import Fonts from '../components/layouts/fonts'
import theme from '../lib/theme'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

const Website = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Head>
        <link
          rel="icon"
          href="/images/coffee-coder-dark.png"
          type="image/png"
        />
      </Head>
      <Layout router={router}>
        <AnimatePresence
          mode="wait"
          initial={true}
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0 })
            }
          }}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  )
}

export default Website
