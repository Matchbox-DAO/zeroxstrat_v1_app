import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
  useStarknetTransactionManager,
  Transaction
} from '@starknet-react/core'
import type { NextPage } from 'next'
import { ConnectWallet } from '~/components/ConnectWallet'

import { CallContractStringifyReturn, htmlParse } from '~/components/Contracts'
import { useGameContract } from '~/hooks/game'
import { useForm } from "react-hook-form";

const Home: NextPage = () => {

  const { account } = useStarknet()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { contract: gameContract } = useGameContract()
  const { data: solutionCountValue } = useStarknetCall({ contract: gameContract, method: 'view_solution_found_count', args: {} })
  const html_string = CallContractStringifyReturn (gameContract, "view_solution_records_as_html");
  const { data, loading, error, reset, invoke:invokeSubmitMoveForLevel } = useStarknetInvoke({
    contract: gameContract,
    method: 'submit_move_for_level',
  })

  // const onSubmitLevel = (data: any) => {
  //   if (!account) {
  //     console.log('user wallet not connected yet.')
  //   }
  //   else if (!gameContract) {
  //     console.log('frontend not connected to game contract')
  //   }
  //   else {
  //     const { data: levelValue } = useStarknetCall({ contract: gameContract, method: 'pull_level', args: { data: data['levelRequired'] } })
  //     console.log('view level...', levelValue)
  //   }
  // }

  const onSubmitMove = (data: any) => {
      if (!account) {
        console.log('user wallet not connected yet.')
      }
      else if (!gameContract) {
        console.log('frontend not connected to game contract')
      }
      else {
        invokeSubmitMoveForLevel ({ args: {
          level: data['levelRequired'],
          move_x: data['moveXRequired'],
          move_y: data['moveYRequired']
        } })
        console.log('submit move...', data)
      }
    }

  return (
    <div>
      <h3>Argent X Wallet</h3>
      <ConnectWallet />

      <h3>0xstrat v1.0</h3>
      <p>:: a Class B solve2mint system ::</p>

      {/* <h3>View level</h3>
      <form onSubmit={handleSubmit(onSubmitLevel)}>
        <input defaultValue="level id" {...register("levelRequired", { required: true })} />
        {errors.levelRequired && <span> (This field is required) </span>}

        <input type="submit" />
      </form> */}

      <h3>Make move</h3>
      <p>level id: felt; 0 or 1</p>
      <p>move.x & move.y: felt; 12 decimal points</p>
      <form onSubmit={handleSubmit(onSubmitMove)}>
        <input defaultValue="level id" {...register("levelRequired", { required: true })} />
        {errors.levelRequired && <span> (This field is required) </span>}

        <input defaultValue="move.x" {...register("moveXRequired", { required: true })} />
        {errors.moveXRequired && <span> (This field is required) </span>}

        <input defaultValue="move.y" {...register("moveYRequired", { required: true })} />
        {errors.moveYRequired && <span> (This field is required) </span>}

        <input type="submit" />
      </form>

      <h3>System status</h3>
      <p> {'>'} Number of solutions found: { solutionCountValue?.count }</p>
      <p> {'>'} Scoreboard: { htmlParse(html_string) }</p>

      <DemoTransactionManager />

    </div>
  )
}


function DemoTransactionManager() {
  const { transactions, removeTransaction } = useStarknetTransactionManager()
  return (
    <div>
      <h3>Transaction Manager</h3>
      <div>
        {transactions.length === 0
          ? 'No transactions'
          : transactions.map((tx, index) => (
              <TransactionItem
                key={index}
                transaction={tx}
                onClick={() => removeTransaction(tx.transactionHash)}
              />
            ))}
      </div>
    </div>
  )
}

function TransactionItem({
  transaction,
  onClick,
}: {
  transaction: Transaction
  onClick: () => void
}) {
  return (
    <div>
      {transaction.status}: {transaction.transactionHash} <button onClick={onClick}>remove</button>
    </div>
  )
}

export default Home
