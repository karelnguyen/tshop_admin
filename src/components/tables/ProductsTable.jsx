import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TablePaginationActionsWrapped from '../pagination/TablePagination'
import ProductsService from '../../services/api/products'
import UpdateProductDialog from '../dialogs/UpdateProductDialog'

const styles = theme => ({
  noData: {
    marginTop: '70px'
  },
  btnDel: {
    marginLeft: '10px'
  },
  noDataDiv: {
    padding: '40px'
  }
})

class ProductsTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    updateProductDialogBool: false
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  deleteProduct (id) {
    return ProductsService
      .destroy(id)
      .then(() => {
        window.location.reload()
      })
      .catch(err => {
        console.log('ERR!', err)
      })
  }

  openDialog () {
    this.setState({ updateProductDialogBool: true })
  }

  closeDialog () {
    this.setState({ updateProductDialogBool: false })
  }

  render () {
    const { rowsPerPage, page } = this.state
    const data = this.props.tableData
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
    const { classes } = this.props

    return (
      <Grid container justify="center">
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
                   <TableCell>#</TableCell>
                   <TableCell>název</TableCell>
                   <TableCell>cena</TableCell>
                   <TableCell>id</TableCell>
                   <TableCell>upravit / smazat</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                   return (
                     <TableRow key={item.id}>
                       <TableCell>{data.indexOf(item) + 1}</TableCell>
                       <TableCell>{item.heading}</TableCell>
                       <TableCell>{item.price}</TableCell>
                       <TableCell>{item.id}</TableCell>
                       <TableCell>
                         <Grid container direction="row">
                           <UpdateProductDialog tableData={item}/>
                           <Tooltip id="tooltip-fab" title="Smazat" >
                             <Button
                               variant="fab"
                               color="secondary"
                               aria-label="Update"
                               className={classes.btnDel}
                               onClick={() => {
                                 this.deleteProduct(item.id)
                               }}
                               >
                               <DeleteIcon />
                             </Button>
                           </Tooltip>
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
