import React from 'react'
import TablePaginationActionsWrapped from '../pagination/TablePagination'
import UsersService from '../../services/api/users'
// Material-ui
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
})

class UsersTable extends React.Component {
  state = {
    allUsers: [],
    page: 0,
    rowsPerPage: 5,
  }

  handleChangePage (event, page) {
    this.setState({ page })
  }

  handleChangeRowsPerPage (event) {
    this.setState({ rowsPerPage: event.target.value })
  }

  getAllUsers () {
    return UsersService
      .getAll()
      .then(response => {
        this.setState({ allUsers: response.data })
      })
      .catch(err => {})
  }

  componentDidMount () {
    this.getAllUsers()
  }

  render () {
    const { allUsers, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, allUsers.length - page * rowsPerPage)
    // const { classes } = this.props
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>uživatel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.email}</TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6}></TableCell>
                  </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={allUsers.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onChangePage={this.handleChangePage.bind(this)}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                  ActionsComponent={TablePaginationActionsWrapped}
                  />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(UsersTable)
