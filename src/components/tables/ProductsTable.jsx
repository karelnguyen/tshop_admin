import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

class ProductsTable extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0)
  }

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1)
  }

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1)
  }

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    )
  }

  render () {
    const products = this.props.products.map(item => {
      return (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.heading}</TableCell>
          <TableCell>{item.price}</TableCell>
        </TableRow>
      )
    })

    // TODO: TablePagination
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>název</TableCell>
              <TableCell>cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{products}</TableBody>
          <TableFooter>
            <TableRow>
                <TablePagination
                />
              </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    )
  }
}

export default ProductsTable
