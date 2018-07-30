import React from 'react'
import AuthService from '../../services/auth/authService'
// Material-ui
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const styles = theme => ({
  paper: {
    margin: '20px',
  }
})

class LoginPage extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }

  handleChange (event) {
    this.setState({ [event.target.id ]: event.target.value })
  }

  login () {
    AuthService
      .login(this.state.username, this.state.password)
  }

  render () {
    const { classes } = this.props
    return (
      <Grid container justify="center" direction="column" alignItems="center">
        login
        <Paper className={classes.paper}>
          <TextField
            id="username"
            onChange={this.handleChange}
            >
          </TextField>
        </Paper>
        password
        <Paper className={classes.paper}>
          <TextField
            id="password"
            onChange={this.handleChange}
            >
          </TextField>
        </Paper>
        <Button color="primary" variant="contained" onClick={this.login}>Login</Button>
      </Grid>
    )
  }
}

export default withStyles(styles)(LoginPage)
