import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import GameAbi from '~/abi/game_abi.json'

export function useGameContract() {
  return useContract({
    abi: GameAbi.abi as Abi[],
    address: '0x023899c9835d78f9c0f5497586ed1fe1197f397a7111bdb32b01cb1ee64ad92b',
  })
}
