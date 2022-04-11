import { Column, usePagination, useSortBy, useTable } from 'react-table'
import Cell from './Cell'
import styled from 'styled-components'
import { useState } from 'react'

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;

  table {
    border-spacing: 0;
    border: 2px solid #222;
    border-radius: 6px;
    color: #222;
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

const PaginationButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

const StyledButton = styled.button<{ disabled?: boolean }>`
  padding: 5px 20px;
  border: 1px solid black;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  border-radius: 6px;
  background: white;
  color: black;
  font-size: 20px;
  cursor: pointer;
`

export default function Table({
  columns,
  data,
  withPagination,
}: {
  columns: Column[]
  data: any
  withPagination?: boolean
}) {
  const [actualPageSize, setActualPageSize] = useState(10)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, setPageSize } = useTable(
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
    useSortBy,
    usePagination
  )

  return (
    <>
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
            {page.map((row, idx) => {
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
      {withPagination && page?.length && (
        <PaginationButtonWrapper>
          <StyledButton
            onClick={() => {
              setActualPageSize((prevPageSize) => {
                const newPageSize = prevPageSize + 10
                setPageSize(newPageSize)
                if (newPageSize >= data.length) {
                  return data.length
                }
                return newPageSize
              })
            }}
            disabled={actualPageSize >= data?.length}
          >
            Show more
          </StyledButton>
        </PaginationButtonWrapper>
      )}
    </>
  )
}
