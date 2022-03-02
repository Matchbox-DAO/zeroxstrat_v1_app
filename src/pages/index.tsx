import { useStarknetCall } from '@starknet-react/core'
import type { NextPage } from 'next'
import { ConnectWallet } from '~/components/ConnectWallet'
import { IncrementCounter } from '~/components/IncrementCounter'
import { TransactionList } from '~/components/TransactionList'
import { useCounterContract } from '~/hooks/counter'

import { CallContractStringifyReturn, htmlParse } from '~/components/Contracts'
import { useGameContract } from '~/hooks/game'

const Home: NextPage = () => {
  const { contract: counter } = useCounterContract()

  const { contract: gameContract } = useGameContract()
  const { data: solutionCountValue } = useStarknetCall({ contract: gameContract, method: 'view_solution_found_count', args: {} })
  const { data: counterValue } = useStarknetCall({ contract: counter, method: 'counter', args: {} })

  const html_string = CallContractStringifyReturn (gameContract, "view_solution_records_as_html");

  return (
    <div>
      <h2>Wallet</h2>
      <ConnectWallet />
      <h2>0xstrat v1</h2>
      {/* <p>Address: {counter?.connectedTo}</p>
      <p>Value: {counterValue?.count}</p> */}

      <p> Solution count: { solutionCountValue?.count }</p>
      <p>{ htmlParse(html_string) }</p>

      {/* <IncrementCounter />
      <h2>Recent Transactions</h2>
      <TransactionList /> */}
    </div>
  )
}

export default Home
