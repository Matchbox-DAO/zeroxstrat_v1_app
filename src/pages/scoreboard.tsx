import React, { useMemo } from 'react'
import type { NextPage } from 'next'
import { useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import styled from 'styled-components'
import { CairoText } from '~/theme'
import { useTable, useSortBy, Column } from 'react-table'

const HomeWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  padding-top: 150px;
  position: relative;
  font-size: 20px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;

  font-weight: 500;
  margin-bottom: 60px;
`

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;

  table {
    border-spacing: 0;
    border: 3px solid black;
    border-radius: 5px;
    color: black;
    background-color: white;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 2px solid black;
      border-right: 2px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const Table = ({ columns, data }: { columns: Column; data: any }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  return (
    <TableWrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </TableWrapper>
  )
}

const Scoreboard: NextPage = () => {
  const { contract: gameContract } = useGameContract()

  const { data, error, loading } = useStarknetCall({
    contract: gameContract,
    method: 'view_solution_records',
    args: [],
  })
  //
  console.log('res', data, error, loading)
  // console.log('account', gameContract)
  const scores = useMemo(
    () => [
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bf4f',
        solution: 33333300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 200,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
      {
        level: 0,
        score: 20,
        address: '0x553789615cc146850f2a54a96af92486ea2e7df753d0c4639c663e4e4e4bfff',
        solution: 300,
      },
    ],
    []
  )
  return (
    <HomeWrapper>
      <ConnectWallet />
      <TitleContainer>
        <CairoText.largeHeader fontWeight={600} fontSize={30} style={{ color: '#222' }}>
          LEARDERBOARD
        </CairoText.largeHeader>
      </TitleContainer>
      <Table
        columns={[
          {
            Header: 'Account',
            accessor: 'address',
          },
          {
            Header: 'Solution',
            accessor: 'solution',
          },
          {
            Header: 'Level',
            accessor: 'level',
          },
          {
            Header: 'Score',
            accessor: 'score',
          },
        ]}
        data={scores}
      />
    </HomeWrapper>
  )
}

export default Scoreboard
