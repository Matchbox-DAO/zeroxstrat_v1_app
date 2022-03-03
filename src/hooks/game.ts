import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import GameAbi from '~/abi/game_abi.json'

export function useGameContract() {
  return useContract({
    abi: GameAbi.abi as Abi[],
    address: '0x070d16b9cd7385155cd521f9f6b5c9056d366237012a224effbd6b2b409a5615',
  })
}
