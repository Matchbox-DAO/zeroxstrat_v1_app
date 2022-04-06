import { useStarknetCall } from '@starknet-react/core'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { useSNSContract } from '~/hooks/sns'

export default function Cell({ value }: { value: string | number }) {
  const addressNumber = new BigNumber(value)
  const addressHex = addressNumber.toString(16)
  const [name, setName] = useState<string | undefined>(undefined)
  const { contract } = useSNSContract()
  const { data, loading } = useStarknetCall({
    contract,
    method: 'sns_lookup_adr_to_name',
    args: [`0x${addressHex}`],
  })

  useEffect(() => {
    if (data && !loading) {
      const isExists = Number(data['exist'])
      if (isExists === 1) {
        const hashName = new BigNumber(data['name']).toString(16)
        setName(hex2a(hashName))
      }
    } else {
      setName(`${addressHex.slice(0, 6)}...${addressHex.slice(-4)}`)
    }
  }, [addressHex, data, loading])

  return useMemo(() => <div id={`cell-${addressHex}`}>{name}</div>, [addressHex, name])
}

function hex2a(hex: string) {
  let str = ''
  for (let i = 0; i < hex.length; i += 2) {
    const v = parseInt(hex.substring(i, i + 2), 16)
    if (v) str += String.fromCharCode(v)
  }
  return str
}
