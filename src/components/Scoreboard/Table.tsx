import { Column, useSortBy, useTable } from 'react-table'
import Cell from './Cell'
import styled from 'styled-components'

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;

  table {
    border-spacing: 0;
    border: 2px solid #222;
    border-radius: 5px;
    color: #222;
    background-color: transparent;
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

export default function Table({ columns, data }: { columns: Column[]; data: any }) {
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
