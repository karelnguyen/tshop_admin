import React from 'react'
import TablePaginationActionsWrapped from '../pagination/TablePagination'
import UpdateProductDialog from '../dialogs/UpdateProductDialog'
import DeleteProductDialog from '../dialogs/DeleteProductDialog'
import ProductDetailDialog from '../dialogs/ProductDetailDialog'
import ProductsService from '../../services/api/products'
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
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  paper: {
    backgroundColor: '#e5e6e8',
    width: '100%'
  },
  noData: {
    minHeight: '200px',
    width: '100%',
  },
  noDataDiv: {
    padding: '40px'
  },
  tableRow: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  updateBtn: {
    marginLeft: '10px',
    marginRight: '10px'
  },
  btnWrapper: {
    minWidth: '190px'
  }
})

class ProductsTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    selected: [],
    tableData: this.props.tableData,
    productDetailBool: false
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

  deleteSelectedProducts () {
    let data = this.state.selected
    let iterCounter = 0
    data.map(x => {
      return ProductsService
        .destroy(x)
        .then(() => {
          iterCounter++
          if (iterCounter === data.length) {
            window.location.reload()
        }
      })
    })
  }

  render () {
    const { rowsPerPage, page, selected } = this.state
    const data = this.props.tableData
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
    const { classes, rerenderProducts } = this.props
    return (
      <Paper className={classes.paper}>
          {data.length === 0
              ?
              <Grid container className={classes.noData} justify="center" alignItems="center">
                <Typography variant="display1" gutterBottom color="textSecondary">
                  Žádná data
                </Typography>
              </Grid>
              :
              <Grid container justify="flex-start" className={classes.noData}>
                <Toolbar>
                  <Button
                    variant="raised"
                    color="secondary"
                    aria-label="Delete"
                    onClick={this.deleteSelectedProducts.bind(this)}
                    disabled={selected.length === 0}
                    >Smazat
                  </Button>
                </Toolbar>
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
                     <TableCell>barva</TableCell>
                     <TableCell>zobrazit / upravit / smazat</TableCell>
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
                          >
                           <TableCell padding="checkbox">
                             <Checkbox
                               onClick={event => this.handleClick(event, item.id)}
                               checked={isSelected}/>
                           </TableCell>
                           <TableCell>{data.indexOf(item) + 1}</TableCell>
                           <TableCell>{item.heading}</TableCell>
                           <TableCell>{item.id}</TableCell>
                           <TableCell>{item.price}</TableCell>
                           <TableCell>{item.color}</TableCell>
                           <TableCell>
                             <Grid container direction="row" className={classes.btnWrapper}>
                               <ProductDetailDialog id={item.id} rerenderProducts={rerenderProducts}/>
                               <span className={classes.updateBtn}>
                                 <UpdateProductDialog tableData={item} rerenderProducts={rerenderProducts}/>
                               </span>
                               <DeleteProductDialog tableData={item} rerenderProducts={rerenderProducts}/>
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
                         count={data.length}
                         page={page}
                         rowsPerPage={rowsPerPage}
                         onChangePage={this.handleChangePage.bind(this)}
                         onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                         ActionsComponent={TablePaginationActionsWrapped}
                         />
                     </TableRow>
                   </TableFooter>
               </Table>
        </Grid>
      }
      </Paper>
    )
  }
}

export default withStyles(styles)(ProductsTable)
