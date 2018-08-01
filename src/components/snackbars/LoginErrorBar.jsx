import React from "react"
import CloseIcon from "@material-ui/icons/Close"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import ErrorIcon from '@material-ui/icons/Error'

const styles = theme => ({
  snack: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  iconError: {
    marginRight: '10px'
  }
})

class LoginErrorBar extends React.Component {
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
            <ErrorIcon className={classes.iconError}/><span>Bad username or password</span>
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

export default withStyles(styles)(LoginErrorBar)
