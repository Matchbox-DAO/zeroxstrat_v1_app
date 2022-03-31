import { useStarknet } from '@starknet-react/core'
import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { AddTransactionResponse } from 'starknet'
import { FP_BN, PRIME_BN } from '~/constants'
import { useGameContract } from './game'

export default function useSolutionSubmitCallback() {
  const { account } = useStarknet()
  const { contract } = useGameContract()

  return useCallback(
    async (level?: string, X?: string, Y?: string) => {
      if (!contract || !account) {
        throw new Error('Missing Dependencies')
      }

      if (!level) {
        throw new Error('Level Not Selected')
      }

      if (!X) {
        throw new Error('Move X not selected')
      }

      if (!Y) {
        throw new Error('Move Y not selected')
      }

      const moveX_FP_BN = new BigNumber(X).multipliedBy(FP_BN)
      const moveY_FP_BN = new BigNumber(Y).multipliedBy(FP_BN)

      const moveX = moveX_FP_BN.isPositive() ? moveX_FP_BN : PRIME_BN.plus(moveX_FP_BN)
      const moveY = moveY_FP_BN.isPositive() ? moveY_FP_BN : PRIME_BN.plus(moveY_FP_BN)

      return contract
        .invoke('submit_move_for_level', [level.toString(), moveX.toString(), moveY.toString()])
        .then((tx: AddTransactionResponse) => {
          console.log('Transaction hash: ', tx.transaction_hash)
        })
        .catch((e) => {
          console.error(e)
        })
    },
    [account, contract]
  )
}
