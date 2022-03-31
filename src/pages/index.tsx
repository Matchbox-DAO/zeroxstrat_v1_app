import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
  useStarknetTransactionManager,
  Transaction,
} from '@starknet-react/core'
import type { NextPage } from 'next'
// import { ConnectWalletButton } from '~/components/ConnectWalletButton'
import { BigNumber } from 'bignumber.js'
import { CallContractStringifyReturn, htmlParse } from '~/components/Contracts'
import { useGameContract } from '~/hooks/game'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components'
import { CairoText } from '~/theme'
import TypewriterComponent from 'typewriter-effect'
import LevelSelect from '~/components/LevelSelect'
import NumericalInput from '~/components/NumericalInput'
import React from 'react'
import { ConnectWalletButton } from '~/components/ConnectWalletButton'
import Scoreboard from '~/components/Scoreboard'
import Footer from '~/components/Footer'

const HomeWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  padding-top: 150px;
  position: relative;
  /* justify-content: center;
  align-items: center; */
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;

  font-weight: 500;
  color: white;
  margin-bottom: 60px;

  .s2m__typewriter,
  .s2m__typewriter__cursor {
    font-family: 'Cairo', sans-serif;
    text-transform: uppercase;
    font-size: 72px;
    font-weight: 700;
    color: white;
    line-height: 150%;
    letter-spacing: 0.04em;
  }
`

const TitlePrimary = styled.div`
  font-size: 60px;
  font-weight: 700;
`

const NameInput = styled.input`
  flex: 1;
  border-radius: 6px;
  font-size: 18px;
  /* width: 48%; */
  border: none;
  padding: 10px 15px;
  display: block;

  ::placeholder {
    color: #dae5ef;
    font-weight: 300;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`

const StyledInputSection = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  position: relative;
`

const SubmitButton = styled.button`
  border-radius: 8px;
  display: block;
  background: rgb(82, 132, 255);
  color: white;
  padding: 25px 20px;
  /* height: 90px;
  width: 162px; */
  border: none;
  cursor: pointer;

  &:disabled {
    background: rgb(199, 211, 227);
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  align-items: center;
  justify-content: center;
`

const PRIME_BN = new BigNumber('3618502788666131213697322783095070105623107215331596699973092056135872020481')
const FP_BN = new BigNumber(10 ** 12)

const Home: NextPage = () => {
  const { account } = useStarknet()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' })
  const { contract: gameContract } = useGameContract()
  const { data: solutionCountValue } = useStarknetCall({
    contract: gameContract,
    method: 'view_solution_found_count',
    args: [],
  })

  // console.log('🚀 ~ file: Footer.tsx ~ line 28 ~ solutionCountValue', solutionCountValue)

  const html_string = CallContractStringifyReturn(gameContract, 'view_solution_records_as_html')
  const {
    data,
    loading,
    error,
    reset,
    invoke: invokeSubmitMoveForLevel,
  } = useStarknetInvoke({
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
    console.log(data)
    // if (!account) {
    //   console.log('user wallet not connected yet.')
    // } else if (!gameContract) {
    //   console.log('frontend not connected to game contract')
    // } else {
    //   BigNumber.config({ EXPONENTIAL_AT: 76 })
    //   let data_movex_fp_bn = new BigNumber(data['moveXRequired']).multipliedBy(FP_BN)
    //   let data_movey_fp_bn = new BigNumber(data['moveYRequired']).multipliedBy(FP_BN)

    //   let move_x = data_movex_fp_bn.isPositive() ? data_movex_fp_bn : PRIME_BN.plus(data_movex_fp_bn)
    //   let move_y = data_movey_fp_bn.isPositive() ? data_movey_fp_bn : PRIME_BN.plus(data_movey_fp_bn)
    //   let move_x_str = move_x.toString()
    //   let move_y_str = move_y.toString()

    //   invokeSubmitMoveForLevel({ args: [data['levelRequired'], move_x_str, move_y_str] })
    //   console.log('submit move: ', data['levelRequired'], move_x_str, move_y_str)
    // }
  }

  return (
    <HomeWrapper>
      <div style={{ margin: '0px auto', minWidth: '60%' }}>
        <TitleContainer>
          Matchbox DAO presents:
          <TypewriterComponent
            onInit={(typewriter) => typewriter.typeString('Solve2Mint').pause().start()}
            options={{
              wrapperClassName: 'Typewriter__wrapper s2m__typewriter',
              cursorClassName: 'Typewriter__cursor s2m__typewriter__cursor',
              cursor: '_',
            }}
          />
          <CairoText.mediumBody fontWeight={600} fontSize={30} style={{ color: '#222' }}>
            A puzzle game built in Cairo
          </CairoText.mediumBody>
        </TitleContainer>
        {/* <p>Contract address (testnet): {snsContract?.connectedTo}</p> */}

        {/* <ShowNameLookup /> */}

        <StyledForm onSubmit={handleSubmit((inputData) => onSubmitMove(inputData))}>
          {/* register your input into the hook by invoking the "register" function */}
          {/* include validation with required or other standard HTML validation rules */}
          {/* errors will return when field validation fails  */}

          <StyledInputSection>
            <LevelSelect control={control} />

            <NameInput
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              // text-specific options
              type="text"
              pattern="[0-9]*[.,]?[0-9]*$"
              minLength={1}
              maxLength={79}
              spellCheck="false"
              placeholder="move.x"
              {...register('moveXRequired', { required: true, valueAsNumber: true })}
            />

            <NameInput
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              // text-specific options
              type="text"
              pattern="[0-9]*[.,]?[0-9]*$"
              minLength={1}
              maxLength={79}
              spellCheck="false"
              placeholder="move.y"
              {...register('moveYRequired', { required: true, valueAsNumber: true })}
            />
          </StyledInputSection>

          <SubmitButton disabled={!isValid} type="submit">
            <CairoText.largeHeader fontWeight={600} fontSize={21}>
              Submit my move
            </CairoText.largeHeader>
          </SubmitButton>
        </StyledForm>
        <Scoreboard />
        <Footer />
        {/* <div>
          <p>[tx status] Submitting: {loading ? 'Submitting' : 'Not Submitting'}</p>
          <p>[tx status] Error: {error || 'No error'}</p>
        </div> */}

        {/* <DemoTransactionManager /> */}
      </div>
    </HomeWrapper>
  )

  // return (
  //   <div>
  //     <h3>Argent X Wallet</h3>
  //     <ConnectWallet />

  //     <h3>0xstrat v1.0</h3>
  //     <p>:: a Class B solve2mint system ::</p>
  //     <p>
  //       {' '}
  //       powered by{' '}
  //       <a href="https://github.com/topology-gg/fountain" target="_blank" rel="noopener noreferrer">
  //         Fountain
  //       </a>
  //       , a mini physics engine in Cairo
  //     </p>

  //     {/* <h3>View level</h3>
  //     <form onSubmit={handleSubmit(onSubmitLevel)}>
  //       <input defaultValue="level id" {...register("levelRequired", { required: true })} />
  //       {errors.levelRequired && <span> (This field is required) </span>}

  //       <input type="submit" />
  //     </form> */}

  //     <h3>Make move</h3>
  //     <p>level id: 0 or 1</p>
  //     <p>move.x & move.y: float; check `game.cairo` for constraints</p>
  //     <form onSubmit={handleSubmit(onSubmitMove)}>
  //       <input placeholder="level id" {...register('levelRequired', { required: true })} />
  //       {errors.levelRequired && <span> (This field is required) </span>}

  //       <input placeholder="move.x" {...register('moveXRequired', { required: true })} />
  //       {errors.moveXRequired && <span> (This field is required) </span>}

  //       <input placeholder="move.y" {...register('moveYRequired', { required: true })} />
  //       {errors.moveYRequired && <span> (This field is required) </span>}

  //       <input type="submit" />
  //     </form>

  //     <h3>System status</h3>
  //     <p>
  //       {' '}
  //       {'>'} Number of solutions found: {solutionCountValue?.[0].toString()}
  //     </p>
  //     <div>
  //       {' '}
  //       {'>'} Scoreboard: {htmlParse(html_string)}
  //     </div>

  //     <DemoTransactionManager />
  //   </div>
  // )
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
              <TransactionItem key={index} transaction={tx} onClick={() => removeTransaction(tx.transactionHash)} />
            ))}
      </div>
    </div>
  )
}

function TransactionItem({ transaction, onClick }: { transaction: Transaction; onClick: () => void }) {
  return (
    <div>
      {transaction.status}: {transaction.transactionHash} <button onClick={onClick}>remove</button>
    </div>
  )
}

export default Home
