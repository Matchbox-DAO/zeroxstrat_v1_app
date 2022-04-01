import { useStarknetCall } from '@starknet-react/core'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { useSNSContract } from '~/hooks/sns'

export default function Cell({ value }: { value: string | number }) {
  const addressNumber = new BigNumber(value)
  const addressHex = addressNumber.toString(16)
  const [name, setName] = useState<string | undefined>(undefined)
  const { contract } = useSNSContract()
  const { data } = useStarknetCall({
    contract,
    method: 'sns_lookup_adr_to_name',
    args: [`0x${addressHex}`],
  })

  useEffect(() => {
    if (data && !name) {
      const isExists = Number(data['exist'])
      const name = new BigNumber(data['name']).toString(16)
      if (isExists === 1) {
        setName(hex2a(name))
      }
    }
  }, [data, name])

  return useMemo(
    () => <div>{name ? name : `${addressHex.slice(0, 6)}...${addressHex.slice(-4)}`}</div>,
    [addressHex, name]
  )
}

function hex2a(hex: string) {
  let str = ''
  for (let i = 0; i < hex.length; i += 2) {
    const v = parseInt(hex.substring(i, i + 2), 16)
    if (v) str += String.fromCharCode(v)
  }
  return str
}
