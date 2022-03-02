import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import GameAbi from '~/abi/game_abi.json'

export function useGameContract() {
  return useContract({
    abi: GameAbi.abi as Abi[],
    address: '0x041ba1fdfbcec347e3f818b9d19006fb5cc552268849935e8ed5a6207061fd8e',
  })
}
