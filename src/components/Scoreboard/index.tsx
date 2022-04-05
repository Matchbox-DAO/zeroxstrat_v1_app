import React, { useMemo } from 'react'
import { useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import styled from 'styled-components'
import { CairoText } from '~/theme'
import Table from './Table'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 500;
  margin-top: 60px;
  margin-bottom: 30px;
`

const LevelNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-decoration: underline;
  font-weight: 500;
  margin-top: 30px;
  margin-bottom: 60px;
`

const LoadingText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
  margin-top: 30px;
  margin-bottom: 60px;
`

interface ScoresInterface {
  address: string
  score: number
  solution: number
  level: number
}

const extractArrayFromData = (data: any) => {
  return data.find((item) => {
    return Array.isArray(item)
  })
}

export default function Scoreboard({ level }: { level?: string }) {
  const { contract: gameContract } = useGameContract()

  const { data, error, loading } = useStarknetCall({
    contract: gameContract,
    method: 'view_solution_records',
    args: [],
  })

  const scores = useMemo(() => {
    if (!data) return []
    let levelIdx = 0
    let levelCount = 0

    const dataArray = extractArrayFromData(data)

    const formattedData = dataArray
      ?.map((item): ScoresInterface => {
        const score = Number(item.score)
        const level = Number(item.level)
        const solution = Number(item.solution_family)
        const address = item.discovered_by

        return { score, level, solution, address }
      })
      .sort((a, b) => b.level - a.level)

    if (!level && formattedData?.length > 0) {
      const clearedByLevel: ScoresInterface[] = []
      formattedData.forEach((item) => {
        if (item.level !== levelIdx) {
          levelCount = 0
          levelIdx = item.level
        }
        if (item.level === levelIdx && levelCount < 5) {
          clearedByLevel.push(item)
          levelCount++
        }
      })
      return clearedByLevel
    }

    if (level) {
      return formattedData?.filter((item) => item.level === Number(level))
    }
    return formattedData ?? []
  }, [data, level])

  const table = useMemo(
    () => (
      <Table
        columns={[
          {
            Header: 'Name',
            accessor: 'address',
          },
          {
            Header: 'Solution',
            accessor: 'solution',
          },
          {
            Header: 'Score',
            accessor: 'score',
          },
          {
            Header: 'Level',
            accessor: 'level',
          },
        ]}
        data={scores}
      />
    ),
    [scores]
  )

  if (loading) {
    return <LoadingText>Loading Leaderboard...</LoadingText>
  }

  return (
    <>
      <TitleContainer>
        <CairoText.largeHeader fontWeight={600} fontSize={30} style={{ color: '#222' }}>
          LEADERBOARD
        </CairoText.largeHeader>
      </TitleContainer>
      {table}
      {!scores.length && !error ? (
        level ? (
          <LevelNotFoundContainer>
            No one has found the solution for this level yet. Be the first one!
          </LevelNotFoundContainer>
        ) : (
          <LevelNotFoundContainer>No solution has been found yet. Be the first one!</LevelNotFoundContainer>
        )
      ) : null}
    </>
  )
}
