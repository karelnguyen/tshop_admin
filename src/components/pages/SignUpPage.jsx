import React from 'react'
import Validator from '../../mixins/validation'
import AuthService from '../../services/auth/authService'
import SignUpErrorBar from '../snackbars/SignUpErrorBar'
import UserAddedBar from '../snackbars/UserAddedBar'
// Material-ui
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: '#e5e6e8',
  },
  tabItem: {
    height: '300px'
  },
  gridWrapper: {

  },
  textfield: {
    width: '280px',
    margin: '20px'
  },
  registerBtn: {
    margin: '30px'
  },
  title: {
    margin: '30px'
  }
})


class SignUpPage extends React.Component {
  constructor () {
    super ()
    this.saveInput = this.saveInput.bind(this)
    this.signUp = this.signUp.bind(this)
    this.closeBars = this.closeBars.bind(this)
    this.state = {
      email: '',
      password: '',
      passwordCheck: '',
      validation: {
        email: false,
        password: false,
      },
      inputErrors: {},
      disabledSignUpBtn: true,
      samePassword: false,
      showSignUpErrorBar: false,
      showUserAddedBar: false,
    }
  }

  saveInput (event) {
    const validator = Validator.testReg(event.target.id, event.target.value)
    const validationObj = this.state.validation
    const inputErrors = this.state.inputErrors

    validationObj[event.target.id] = validator
    this.setState({ validation: validationObj })
    inputErrors[event.target.id] = !validator
    this.setState({ inputErrors: inputErrors })

    // callback for getting latest lifecycle
    this.setState({ [event.target.id]: event.target.value }, () => {
      return this.toggleSignUpButton()
    })
  }

  toggleSignUpButton () {
    let anomalyObj = []
    let anomaly = true
    const validationObj = this.state.validation

    for (let i in validationObj) {
      anomalyObj.push(validationObj[i])
    }

    anomalyObj.map(x => x === false ? anomaly = false : null)

    if (this.state.password === this.state.passwordCheck && this.state.password.length > 1 && anomaly === true) {
      return this.setState({ disabledSignUpBtn: false })
    } else {
      return this.setState({ disabledSignUpBtn: true })
    }
  }

  signUp () {
    return AuthService
      .signUp(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          email: '',
          password: '',
          passwordCheck: '',
          showUserAddedBar: true,
          disabledSignUpBtn: true,
        })
      })
      .catch(() => {
        this.setState({ showSignUpErrorBar: true })
      })
  }

  closeBars (event, reason) {
    if (reason === 'clickaway') {
      return
    }
    this.setState({
      showSignUpErrorBar: false,
      showUserAddedBar: false,
     })
  }

  render () {
    const { classes } = this.props
    const { inputErrors, disabledSignUpBtn, showSignUpErrorBar, showUserAddedBar } = this.state
    return (
      <div className={classes.root}>
        <Paper>
          <Grid container justify="center" direction="column" className={classes.gridWrapper} alignItems="center">
            <Typography variant="display1" className={classes.title}>Registrace nových uživatelů</Typography>
            <form >
              <Grid container justify="center" direction="column" className={classes.gridWrapper} alignItems="center">
                <TextField
                  id="email"
                  autoComplete="email"
                  placeholder="email"
                  className={classes.textfield}
                  onChange={this.saveInput}
                  error={inputErrors.email}
                  >
                </TextField>
                <TextField
                  id="password"
                  autoComplete="off"
                  type="password"
                  placeholder="heslo"
                  className={classes.textfield}
                  onChange={this.saveInput}
                  error={inputErrors.password}
                  >
                </TextField>
                <TextField
                  id="passwordCheck"
                  autoComplete="off"
                  type="password"
                  placeholder="znova heslo"
                  className={classes.textfield}
                  onChange={this.saveInput}
                  error={inputErrors.passwordCheck}
                  >
                </TextField>
              </Grid>
            </form>
            <Button variant="contained" color="secondary"
              className={classes.registerBtn}
              disabled={disabledSignUpBtn}
              onClick={this.signUp}
              >Registrovat uživatele</Button>
          </Grid>
        </Paper>
        <SignUpErrorBar open={showSignUpErrorBar} closeFn={this.closeBars} />
        <UserAddedBar open={showUserAddedBar} closeFn={this.closeBars} />
      </div>
    )
  }
}

export default withStyles(styles)(SignUpPage)
