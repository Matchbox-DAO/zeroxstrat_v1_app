import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { FixedGlobalStyle, ThemedGlobalStyle } from '../theme'
import { StarknetProvider } from '@starknet-react/core'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StarknetProvider>
      <NextHead>
        <title>0xstrat v1.0</title>
      </NextHead>
      <FixedGlobalStyle />
      <ThemedGlobalStyle />
      <Component {...pageProps} />
    </StarknetProvider>
  )
}

export default MyApp
