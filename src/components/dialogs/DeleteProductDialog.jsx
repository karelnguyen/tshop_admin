import React from 'react'
import ProductsService from '../../services/api/products'
// Material-ui
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
// styles
})

class DeleteProductDialog extends React.Component {
  constructor () {
    super ()
    this.state = {
      open: false
    }
  }

  handleClickOpen () {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  deleteProduct (id) {
    return ProductsService
      .destroy(id)
      .then(() => {
        window.location.reload()
      })
  }

  render () {
    const { tableData } = this.props
    return (
      <div>
        <Tooltip id="tooltip-fab" title="Smazat" >
          <Button
            variant="fab"
            color="secondary"
            aria-label="Delete"
            onClick={this.handleClickOpen}
            >
            <DeleteIcon />
          </Button>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          >
          <DialogTitle id="form-dialog-title">Smazat produkt</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you really want to delete this product?
            </DialogContentText>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.deleteProduct(tableData.id)} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(DeleteProductDialog)
