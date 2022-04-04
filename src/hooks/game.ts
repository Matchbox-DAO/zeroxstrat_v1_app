import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import GameAbi from '~/abi/game_abi.json'

export function useGameContract() {
  return useContract({
    abi: GameAbi as Abi,
    address: '0x039a8e74825d60addee8af5dbdbb6173e54b91942920208e0c14097b4e2eeefd',
  })
}
