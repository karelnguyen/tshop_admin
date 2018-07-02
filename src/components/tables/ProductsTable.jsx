import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TablePaginationActionsWrapped from '../pagination/TablePagination'

class ProductsTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    tableNumber: 0
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render () {
    const { rowsPerPage, page, tableNumber } = this.state
    const data = this.props.tableData
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>cislo</TableCell>
              <TableCell>id</TableCell>
              <TableCell>název</TableCell>
              <TableCell>cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{tableNumber}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.heading}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              )
            })}
            {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={data.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    )
  }
}

export default ProductsTable
