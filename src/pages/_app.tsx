import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { FixedGlobalStyle, ThemedGlobalStyle } from '../theme'
import { StarknetProvider } from '@starknet-react/core'
import Header from '~/components/Header'
import { BigNumber } from 'bignumber.js'

function MyApp({ Component, pageProps }: AppProps) {
  BigNumber.config({ EXPONENTIAL_AT: 76 })

  return (
    <StarknetProvider>
      <NextHead>
        <title>0xstrat v1.0</title>
      </NextHead>
      <FixedGlobalStyle />
      <ThemedGlobalStyle />
      <Header />
      <Component {...pageProps} />
    </StarknetProvider>
  )
}

export default MyApp
