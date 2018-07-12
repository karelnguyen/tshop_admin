import React from 'react'
import TablePaginationActionsWrapped from '../pagination/TablePagination'
import UpdateProductDialog from '../dialogs/UpdateProductDialog'
import DeleteProductDialog from '../dialogs/DeleteProductDialog'
// Material-ui
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  noData: {
    marginTop: '70px'
  },
  noDataDiv: {
    padding: '40px'
  },
})

class ProductsTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    selected: [],
    tableData: this.props.tableData
  }

  handleChangePage (event, page) {
    this.setState({ page })
  }

  handleChangeRowsPerPage (event) {
    this.setState({ rowsPerPage: event.target.value })
  }

  handleSelectAllClick (event, checked) {
    if (checked) {
      let data = this.props.tableData.map(n => n.id)
      this.setState({ selected: data})
      return
    }
    this.setState({ selected: [] })
  }

  handleClick (event, id) {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    this.setState({ selected: newSelected })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render () {
    const { rowsPerPage, page, selected } = this.state
    const data = this.props.tableData
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
    const { classes } = this.props
    return (
      <Grid container justify="flex-start">
        <Toolbar>
          {selected.length > 0
            ?
              <Button
                variant="raised"
                color="secondary"
                aria-label="Delete"
                >Smazat</Button>
            :
            <div></div>
          }
        </Toolbar>
        {data.length === 0
            ?
            <Grid item className={classes.noData}>
              <Typography variant="display1" gutterBottom color="textSecondary">
                Žádná data
              </Typography>
            </Grid>
            :
            <Table>
               <TableHead>
                 <TableRow>
                   <TableCell padding="checkbox">
                     <Tooltip id="tooltip-fab" title="Vše">
                       <Checkbox
                          indeterminate={selected.length > 0 && selected.length < data.length}
                          checked={selected.length === data.length}
                          onChange={this.handleSelectAllClick.bind(this)}
                        />
                     </Tooltip>
                   </TableCell>
                   <TableCell>#</TableCell>
                   <TableCell>název</TableCell>
                   <TableCell>id</TableCell>
                   <TableCell>cena</TableCell>
                   <TableCell>upravit / smazat</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {data
                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                   .map(item => {
                     const isSelected = this.isSelected(item.id)
                   return (
                     <TableRow
                       key={item.id}
                       role="checkbox"
                       onClick={event => this.handleClick(event, item.id)}
                       aria-checked={isSelected}
                       tabIndex={-1}
                       selected={isSelected}
                       >
                       <TableCell padding="checkbox">
                         <Checkbox checked={isSelected}/>
                       </TableCell>
                       <TableCell>{data.indexOf(item) + 1}</TableCell>
                       <TableCell>{item.heading}</TableCell>
                       <TableCell>{item.id}</TableCell>
                       <TableCell>{item.price}</TableCell>
                       <TableCell>
                         <Grid container direction="row">
                           <UpdateProductDialog tableData={item}/>
                           <DeleteProductDialog tableData={item}/>
                         </Grid>
                       </TableCell>
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
          }
      </Grid>
    )
  }
}

export default withStyles(styles)(ProductsTable)
