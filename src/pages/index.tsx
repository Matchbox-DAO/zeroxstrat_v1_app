import { useStarknet, useStarknetTransactionManager } from '@starknet-react/core'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { CairoText } from '~/theme'
import LevelSelect from '~/components/LevelSelect'
import React, { useState } from 'react'
import Scoreboard from '~/components/Scoreboard'
import useSolutionSubmitCallback from '~/hooks/useSolutionSubmitCallback'
import { useS2MTransactionManager, Transaction } from '~/providers/transaction'
import Popups from '~/components/Popups'

const HomeWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  padding-top: 150px;
  position: relative;
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

const Solve2MintTitle = styled.div`
  font-size: 72px;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
  text-transform: uppercase;
  line-height: 150%;
  letter-spacing: 0.04em;
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
  } = useForm({
    mode: 'onChange',
  })
  const [level, setLevel] = useState<string | undefined | null>(undefined)

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
      <Popups />
      <div style={{ margin: '0px auto', minWidth: '60%' }}>
        <TitleContainer>
          Topology and Matchbox DAO presents:
          <Solve2MintTitle>Solve2Mint</Solve2MintTitle>
          <CairoText.mediumBody fontWeight={600} fontSize={30} style={{ color: '#222' }}>
            Level Up Your Cairo
          </CairoText.mediumBody>
        </TitleContainer>

        <StyledForm onSubmit={handleSubmit((inputData) => onSubmitMove(inputData))}>
          <StyledInputSection>
            <LevelSelect control={control} setLevel={setLevel} />

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
                  value: /^-?\d+(\.\d+)?$/,
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
                  value: /^-?\d+(\.\d+)?$/,
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
        <Scoreboard level={level} />
        {/* <div>
          <p>[tx status] Submitting: {loading ? 'Submitting' : 'Not Submitting'}</p>
          <p>[tx status] Error: {error || 'No error'}</p>
        </div> */}

        {/* <DemoTransactionManager /> */}
      </div>
    </HomeWrapper>
  )
}

export default Home
