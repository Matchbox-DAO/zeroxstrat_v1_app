import React, { useEffect, useMemo, useState } from 'react'
import type { NextPage } from 'next'
import { useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import styled from 'styled-components'
import { CairoText } from '~/theme'
import { useTable, useSortBy, Column } from 'react-table'
import { useSNSContract } from '~/hooks/sns'
import { BigNumber } from 'bignumber.js'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;

  font-weight: 500;
  margin-top: 60px;
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
      min-width: 200px;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function hex2a(hex: string) {
  let str = ''
  for (let i = 0; i < hex.length; i += 2) {
    const v = parseInt(hex.substring(i, i + 2), 16)
    if (v) str += String.fromCharCode(v)
  }
  return str
}

const Cell = ({ value }: { value: string | number }) => {
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

  return <div>{name ?? `${addressHex.slice(0, 6)}...${addressHex.slice(-4)}`}</div>
}

const Table = ({ columns, data }: { columns: Column[]; data: any }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn: {
        Cell: (props: any) => {
          if (props.column.Header === 'Name') {
            return <Cell value={props.value} />
          }
          return props.value
        },
      },
    },
    useSortBy
  )

  return (
    <TableWrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`headtr-${idx}`}>
              {headerGroup.headers.map((column, index) => {
                const { getHeaderProps, render } = column
                // Cast here because keys are missing these keys in interface
                const { getSortByToggleProps, isSorted, isSortedDesc } = column as any
                return (
                  <th {...getHeaderProps(getSortByToggleProps())} key={`headtr-th-${idx}-${index}`}>
                    {render('Header')}
                    <span>{isSorted ? (isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={`tr-${idx}`}>
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()} key={`tr-td-${idx}-${index}`}>
                      {cell.render('Cell')}
                    </td>
                  )
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

  const { data, error } = useStarknetCall({
    contract: gameContract,
    method: 'view_solution_records',
    args: [],
  })

  const scores = useMemo(() => {
    if (!data || error) return []
    return data[0]
      .map((item) => {
        const score = Number(item.score)
        const level = Number(item.level)
        const solution = Number(item.solution_family)
        const address = item.discovered_by

        return { score, level, solution, address }
      })
      .sort((a, b) => b.level - a.level)
  }, [data, error])

  return (
    <>
      <TitleContainer>
        <CairoText.largeHeader fontWeight={600} fontSize={30} style={{ color: '#222' }}>
          LEARDERBOARD
        </CairoText.largeHeader>
      </TitleContainer>
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
    </>
  )
}

export default Scoreboard
