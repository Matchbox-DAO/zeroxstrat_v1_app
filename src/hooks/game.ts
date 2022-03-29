import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import GameAbi from '~/abi/game_abi.json'

export function useGameContract() {
  return useContract({
    abi: GameAbi.abi as Abi[],
    address: '0x0195566fc35e9b48a813d5dba08339f12906cf2b6d01a589907f10500b94ecf3',
  })
}
