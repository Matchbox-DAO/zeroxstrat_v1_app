import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { FixedGlobalStyle, ThemedGlobalStyle } from '../theme'
import { StarknetProvider } from '@starknet-react/core'
import Header from '~/components/Header'
import { BigNumber } from 'bignumber.js'
import { S2MTransactionManagerProvider } from '~/providers/transaction'
import Footer from '~/components/Footer'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  BigNumber.config({ EXPONENTIAL_AT: 76 })

  return (
    <StarknetProvider>
      <S2MTransactionManagerProvider>
        <NextHead>
          <title>Solve2Mint</title>
        </NextHead>
        <FixedGlobalStyle />
        <ThemedGlobalStyle />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </S2MTransactionManagerProvider>
    </StarknetProvider>
  )
}

export default MyApp
