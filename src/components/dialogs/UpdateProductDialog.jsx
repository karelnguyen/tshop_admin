import React from 'react'
import UpdateIcon from '../../assets/border-color.png'
import ProductsService from '../../services/api/products'
import Validator from '../../mixins/validation'
// Material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import amber from '@material-ui/core/colors/amber'

// Custom UI theme
const theme = createMuiTheme({
  palette: {
    secondary: amber
  }
})

const styles = theme => ({
  icon: {
    width: '29px',
    height: '29px',
    marginTop: '7px'
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
    let errorData = this.state.validation

    data[event.target.id] = event.target.value
    this.setState({ input: data })

    // Validator is set to exact patterns for each input. Adding inputs also require adding additional patterns
    if (Validator.testReg(event.target.id, event.target.value) === false) {
      errorData[event.target.id] = true
      this.setState({ validation: errorData })
    } else {
      errorData[event.target.id] = false
      this.setState({ validation: errorData })
    }

    return this.toggleAddButton()
  }


  toggleAddButton () {
    const data = this.state.validation
    let toggleAddButtonBool = true

    for (let i in data) {
      if (data[i] === true) {
        toggleAddButtonBool = false
      } else {
        toggleAddButtonBool = true
      }
    }

    if (toggleAddButtonBool === false) {
      this.setState({ updateBtnBool: true})
    } else {
      this.setState({ updateBtnBool: false})
    }
  }

  updateProduct (id) {
    let data = this.state.input
    ProductsService
      .update(id, data)
      .then(() => {
        this.setState({ open: false })
        this.props.rerenderProducts()
      })
  }

  render () {
    const { classes, tableData } = this.props
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Tooltip id="tooltip-fab" title="Upravit" >
              <Button
                variant="fab"
                color='secondary'
                aria-label="Update"
                onClick={this.handleClickOpen}
                >
                <img className={classes.icon} src={UpdateIcon} alt="uptade btn"/>
              </Button>
          </Tooltip>
        </MuiThemeProvider>
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
             error={this.state.validation.heading}
             fullWidth
           />
           <TextField
             id="color"
             margin="dense"
             label="Color"
             defaultValue={tableData.color}
             onChange={this.saveInputData.bind(this)}
             error={this.state.validation.color}
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
             error={this.state.validation.shortText}
             fullWidth
           />
           <TextField
             id="longText"
             margin="dense"
             label="Long text"
             defaultValue={tableData.longText}
             onChange={this.saveInputData.bind(this)}
             error={this.state.validation.longText}
             fullWidth
           />
           <TextField
             id="size"
             margin="dense"
             label="Size"
             defaultValue={tableData.size}
             onChange={this.saveInputData.bind(this)}
             error={this.state.validation.size}
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
