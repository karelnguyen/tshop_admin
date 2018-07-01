import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

class ProductsTable extends React.Component {
  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                item head
              </TableCell>
              <TableCell>
                item head
              </TableCell>
              <TableCell>
                item head
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                item body
              </TableCell>
              <TableCell>
                item body
              </TableCell>
              <TableCell>
                item body
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                item body
              </TableCell>
              <TableCell>
                item body
              </TableCell>
              <TableCell>
                item body
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default ProductsTable
