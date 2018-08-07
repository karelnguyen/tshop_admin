import React from "react"
// Material-ui
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CloseIcon from "@material-ui/icons/Close"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'
import green from '@material-ui/core/colors/green'

const styles = theme => ({
  snack: {
    backgroundColor: green[600]
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: '10px'
  }
})

class AddProductBar extends React.Component {
  render() {
    const { open, closeFn, classes } = this.props

    return (
      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        autoHideDuration={2000}
        ContentProps={{"aria-describedby": "message-id"}}
        open={open}
        onClose={() => {closeFn()}}
      >
      <SnackbarContent
        className={classes.snack}
        onClose={() => {closeFn()}}
        message={
          <span id="message-id" className={classes.message}>
            <DoneIcon className={classes.icon}/><span>Product added</span>
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => {closeFn()}}
          >
            <CloseIcon />
          </IconButton>
        ]}
        />
      </Snackbar>
    )
  }
}

export default withStyles(styles)(AddProductBar)
