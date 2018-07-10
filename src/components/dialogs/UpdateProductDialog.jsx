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
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render () {
    const { classes, tableData } = this.props
    console.log(this.props)
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
             To subscribe to this website, please enter your email address here. We will send
             updates occasionally.
           </DialogContentText>
           <TextField
             autoFocus
             margin="dense"
             id="heading"
             label="Product name"
             type="text"
             value={tableData.heading}
             fullWidth
           />
           <TextField
             value={tableData.id}
             fullWidth
           />
           <TextField
             value={tableData.color}
             fullWidth
           />
           <TextField
             value={tableData.img}
             fullWidth
           />
           <TextField
             value={tableData.longText}
             fullWidth
           />
           <TextField
             value={tableData.shortText}
             fullWidth
           />
           <TextField
             value={tableData.size}
             fullWidth
           />
           <TextField
             value={tableData.price}
             fullWidth
           />
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleClose} color="primary">
             Cancel
           </Button>
           <Button onClick={this.handleClose} color="primary">
             Subscribe
           </Button>
         </DialogActions>
       </Dialog>
     </div>
    )
  }
}

export default withStyles(styles)(UpdateProductDialog)
