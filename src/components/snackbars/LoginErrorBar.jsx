import React from "react"
import CloseIcon from "@material-ui/icons/Close"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from '@material-ui/core/IconButton'

class LoginErrorBar extends React.Component {
  render() {
    const { open, closeFn } = this.props

    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        autoHideDuration={2000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        open={open}
        onClose={() => {closeFn()}}
        message={<span id="message-id">Bad username or password</span>}
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
    )
  }
}

export default LoginErrorBar
