import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
  useStarknetTransactionManager,
  Transaction
} from '@starknet-react/core'
import type { NextPage } from 'next'
import { ConnectWallet } from '~/components/ConnectWallet'
import { BigNumber } from 'bignumber.js'
import { CallContractStringifyReturn, htmlParse } from '~/components/Contracts'
import { useGameContract } from '~/hooks/game'
import { useForm } from "react-hook-form";

const PRIME_BN = new BigNumber ('3618502788666131213697322783095070105623107215331596699973092056135872020481')
const FP_BN = new BigNumber (10**12)

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
        BigNumber.config({ EXPONENTIAL_AT: 76 })
        let data_movex_fp_bn = new BigNumber (data['moveXRequired']).multipliedBy(FP_BN)
        let data_movey_fp_bn = new BigNumber (data['moveYRequired']).multipliedBy(FP_BN)

        let move_x = data_movex_fp_bn.isPositive() ? data_movex_fp_bn : PRIME_BN.plus (data_movex_fp_bn)
        let move_y = data_movey_fp_bn.isPositive() ? data_movey_fp_bn : PRIME_BN.plus (data_movey_fp_bn)
        let move_x_str = move_x.toString()
        let move_y_str = move_y.toString()

        invokeSubmitMoveForLevel ({ args: {
          level: data['levelRequired'],
          move_x: move_x_str,
          move_y: move_y_str
        } })
        console.log('submit move: ', data['levelRequired'], move_x_str, move_y_str)
      }
    }

  return (
    <div>
      <h3>Argent X Wallet</h3>
      <ConnectWallet />

      <h3>0xstrat v1.0</h3>
      <p>:: a Class B solve2mint system ::</p>
      <p>   powered by <a href="https://github.com/topology-gg/fountain" target="_blank" rel="noopener noreferrer">Fountain</a>, a mini physics engine in Cairo</p>

      {/* <h3>View level</h3>
      <form onSubmit={handleSubmit(onSubmitLevel)}>
        <input defaultValue="level id" {...register("levelRequired", { required: true })} />
        {errors.levelRequired && <span> (This field is required) </span>}

        <input type="submit" />
      </form> */}

      <h3>Make move</h3>
      <p>level id: 0 or 1</p>
      <p>move.x & move.y: float; check `game.cairo` for constraints</p>
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
      <div> {'>'} Scoreboard: { htmlParse(html_string) }</div>

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
