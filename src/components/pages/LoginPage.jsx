import React from 'react'
import AuthService from '../../services/auth/authService'
import LoginErrorBar from '../snackbars/LoginErrorBar'
import Validator from '../../mixins/validation'
import { Redirect } from 'react-router-dom'
// Material-ui
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    height: '100vh',
    backgroundColor: '#343434',
  },
  paper: {
    height: '300px',
  },
  gridContainer: {
    height: '100%'
  },
  textfield: {
    margin: '10px',
    width: '60%'
  },
  loginBtn: {
    marginTop: '20px',
    width: '50%'
  }
})

class LoginPage extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
    this.closeLoginErrorBar = this.closeLoginErrorBar.bind(this)

    this.state = {
      validation: {
        email: false,
        password: false,
      },
      inputErrors: {},
      disabledLoginBtn: true,
      showLoginErrorBar: false,
    }
  }

  handleChange (event) {
    const validator = Validator.testReg(event.target.id, event.target.value)
    const validationObj = this.state.validation
    const inputErrors = this.state.inputErrors

    validationObj[event.target.id] = validator
    this.setState({ validation: validationObj })

    this.setState({ [event.target.id]: event.target.value })

    inputErrors[event.target.id] = !validator
    this.setState({ inputErrors: inputErrors })

    return this.toggleLoginButton()
  }

  toggleLoginButton () {
    let anomalyObj = []
    let anomaly = true
    const validationObj = this.state.validation

    for (let i in validationObj) {
      anomalyObj.push(validationObj[i])
    }

    anomalyObj.map(x => x === false ? anomaly = false : null)
    if (anomaly === true) {
      this.setState({ disabledLoginBtn: false })
    } else {
      this.setState({ disabledLoginBtn: true })
    }
  }

  login () {
    AuthService
      .login(this.state.email, this.state.password)
      .catch(() => {
        this.setState({ showLoginErrorBar: true })
      })
  }

  closeLoginErrorBar (event, reason) {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ showLoginErrorBar: false })
  }

  render () {;
    if (AuthService.isAuthenticated()) {
      return <Redirect to='/' />
    }

    const { classes } = this.props
    return (
      <Grid container className={classes.root} justify="center" alignItems="center">
        <Grid item xs={10} sm={6} md={4} lg={3}>
          <Paper className={classes.paper}>
            <Grid container direction="column" className={classes.gridContainer} alignItems="center" justify="center">
              <form>
                <Grid container alignItems="center" justify="center">
                  <TextField
                    id="email"
                    autoComplete="email"
                    placeholder="email"
                    required={true}
                    className={classes.textfield}
                    onChange={this.handleChange}
                    error={this.state.inputErrors.email}
                    />
                  <TextField
                    autoComplete="off"
                    id="password"
                    type="password"
                    onChange={this.handleChange}
                    placeholder="password"
                    required={true}
                    className={classes.textfield}
                    error={this.state.inputErrors.password}
                    />
                </Grid>
              </form>
              <Button color="primary" variant="contained"
                className={classes.loginBtn}
                onClick={this.login}
                disabled={this.state.disabledLoginBtn}
                >Login</Button>
            </Grid>
          </Paper>
        </Grid>
        <LoginErrorBar open={this.state.showLoginErrorBar} closeFn={this.closeLoginErrorBar}/>
      </Grid>
    )
  }
}

export default withStyles(styles)(LoginPage)
