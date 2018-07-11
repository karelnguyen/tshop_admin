import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import UpdateIcon from '../../assets/border-color.png'
import ProductsService from '../../services/api/products'
import Validator from '../../mixins/validation'

const styles = theme => ({
  icon: {
    width: '29px',
    height: '29px',
    marginTop: '5px'
  }
})

class UpdateProductDialog extends React.Component {
  state = {
    open: false,
    input: this.props.tableData,
    validation: {},
    updateBtnBool: true
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  saveInputData (event) {
    let data = this.state.input
    data[event.target.id] = event.target.value
    this.setState({ input: data })
    // Validator is set to exact patterns for each input. Adding inputs also require adding additional patterns
    if (Validator.testReg(event.target.id, event.target.value) === false) {
      let errorData = this.state.validation
      errorData[event.target.id] = true
      this.setState({ validation: errorData })
    } else {
      this.setState({ validation: {} })
    }
    return this.toggleAddButton()
  }

  toggleAddButton () {
    // Change when data model/schema change. Also the RegExp will need to be updated due to exact patterns for each entry input. (toggle button)
    let objSize = Object.keys(this.state.input).length
    let objVal = Object.keys(this.state.validation).length
    if (objSize === 11 && objVal === 0) {
      this.setState({ updateBtnBool: false })
    } else {
      this.setState({ updateBtnBool: true })
    }
  }

  updateProduct (id) {
    let data = this.state.input
    return ProductsService
      .update(id, data)
      .then(() => {
        window.location.reload()
      })
      .catch(err => {
        console.log('Error', err)
      })
  }

  render () {
    const { classes, tableData } = this.props
    return (
      <div>
        <Tooltip id="tooltip-fab" title="Upravit" >
          <Button
            variant="fab"
            color="primary"
            aria-label="Update"
            onClick={this.handleClickOpen}
            >
            <img className={classes.icon} src={UpdateIcon} alt="uptade btn"/>
          </Button>
        </Tooltip>
         <Dialog
           open={this.state.open}
           onClose={this.handleClose}
           aria-labelledby="form-dialog-title"
         >
         <DialogTitle id="form-dialog-title">Upravit produkt</DialogTitle>
         <DialogContent>
           <DialogContentText>
             Update product, all fields are required.
           </DialogContentText>
           <TextField
             id="id"
             disabled={true}
             margin="dense"
             label="Product id"
             defaultValue={tableData.id}

             onChange={this.saveInputData.bind(this)}
             fullWidth
             />
           <TextField
             autoFocus
             margin="dense"
             id="heading"
             label="Product name"
             defaultValue={tableData.heading}
             onChange={this.saveInputData.bind(this)}
             fullWidth
           />
           <TextField
             id="color"
             margin="dense"
             label="Color"
             defaultValue={tableData.color}
             onChange={this.saveInputData.bind(this)}
             fullWidth
           />
           <TextField
             id="img"
             margin="dense"
             label="Img"
             defaultValue={tableData.img}
             onChange={this.saveInputData.bind(this)}
             fullWidth
           />
           <TextField
             id="shortText"
             margin="dense"
             label="Short text"
             defaultValue={tableData.shortText}
             onChange={this.saveInputData.bind(this)}
             fullWidth
           />
           <TextField
             id="longText"
             margin="dense"
             label="Long text"
             defaultValue={tableData.longText}
             onChange={this.saveInputData.bind(this)}
             fullWidth
           />
           <TextField
             id="size"
             margin="dense"
             label="Size"
             defaultValue={tableData.size}
             onChange={this.saveInputData.bind(this)}
             error={this.state.validation.price}
             fullWidth
           />
           <TextField
             id="price"
             margin="dense"
             label="Price"
             defaultValue={tableData.price}
             onChange={this.saveInputData.bind(this)}
             error={this.state.validation.price}
             fullWidth
           />
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleClose} color="primary">
             Cancel
           </Button>
           <Button onClick={() => this.updateProduct(tableData.id)} color="primary" disabled={this.state.updateBtnBool}>
             Update
           </Button>
         </DialogActions>
       </Dialog>
     </div>
    )
  }
}

export default withStyles(styles)(UpdateProductDialog)
