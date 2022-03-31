import { useStarknet, useStarknetTransactionManager, Transaction } from '@starknet-react/core'
import type { NextPage } from 'next'
import { BigNumber } from 'bignumber.js'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components'
import { CairoText } from '~/theme'
import TypewriterComponent from 'typewriter-effect'
import LevelSelect from '~/components/LevelSelect'
import React from 'react'
import useSolutionSubmitCallback from '~/hooks/useSolutionSubmitCallback'

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

const Home: NextPage = () => {
  const { account } = useStarknet()
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
    resetField,
  } = useForm({ mode: 'onChange' })

  const solutionSubmitCallback = useSolutionSubmitCallback()

  const onSubmitMove = (data: any) => {
    console.log(data)

    const level = data['level-select'].value
    const X = data['moveXRequired']
    const Y = data['moveYRequired']

    if (level && X && Y) {
      solutionSubmitCallback(level, X, Y).then(() => {
        resetField('moveXRequired')
        resetField('moveYRequired')
      })
    }
  }

  return (
    <HomeWrapper>
      <div style={{ margin: '0px auto', minWidth: '60%' }}>
        {/* <h3>Argent X Wallet</h3> */}
        {/* <ConnectWallet /> */}

        <TitleContainer>
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

        <StyledForm onSubmit={handleSubmit((inputData) => onSubmitMove(inputData))}>
          <StyledInputSection>
            <LevelSelect control={control} />

            <NameInput
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              // text-specific options
              type="text"
              minLength={1}
              maxLength={79}
              spellCheck="false"
              placeholder="move.x"
              {...register('moveXRequired', {
                required: true,
                pattern: {
                  value: /^-?[0-9]+$/,
                  message: 'Please enter a number',
                },
              })}
            />

            <NameInput
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              // text-specific options
              type="text"
              minLength={1}
              maxLength={79}
              spellCheck="false"
              placeholder="move.y"
              {...register('moveYRequired', {
                required: true,
                pattern: {
                  value: /^-?[0-9]+$/,
                  message: 'Please enter a number',
                },
              })}
            />
          </StyledInputSection>

          <SubmitButton disabled={!isValid || !account} type="submit">
            <CairoText.largeHeader fontWeight={600} fontSize={21}>
              Submit my move
            </CairoText.largeHeader>
          </SubmitButton>
        </StyledForm>

        {/* <div>
          <p>[tx status] Submitting: {loading ? 'Submitting' : 'Not Submitting'}</p>
          <p>[tx status] Error: {error || 'No error'}</p>
        </div> */}

        {/* <DemoTransactionManager /> */}
      </div>
    </HomeWrapper>
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
