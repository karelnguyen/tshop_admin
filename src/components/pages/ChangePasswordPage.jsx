import React from 'react'
import UsersService from '../../services/api/users'
import AuthService from '../../services/auth/authService'
import Validator from '../../mixins/validation'
// Material-ui
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  title: {
    margin: '30px'
  },
  textfield: {
    width: '110%',
    margin: '15px'
  },
  btn: {
    margin: '30px'
  },
})

class ChangePasswordPage extends React.Component {
  constructor () {
    super()
    this.saveInput = this.saveInput.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.state = {
      password: '',
      passwordCheck: '',
      validation: {
        password: false,
      },
      inputErrors: {},
      samePassword: false,
      disabledBtn: true,
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

    this.setState({ [event.target.id]: event.target.value }, () => {
      return this.toggleButton()
    })
  }

  toggleButton () {
    let anomalyObj = []
    let anomaly = true
    const validationObj = this.state.validation

    for (let i in validationObj) {
      anomalyObj.push(validationObj[i])
    }

    anomalyObj.map(x => x === false ? anomaly = false : null)

    if (this.state.password === this.state.passwordCheck && anomaly === true) {
      return this.setState({ disabledBtn: false })
    } else {
      return this.setState({ disabledBtn: true })
    }
  }

  changePassword () {
    UsersService
      .changePassword(this.state.password)
      .then(() => {
        AuthService.logout()
      })
  }

  render () {
    const { classes } = this.props
    const { disabledBtn, inputErrors } = this.state
    return (
      <div>
        <Paper>
          <Grid container direction="column" justify="center" alignItems="center">
            <Typography variant="display1" className={classes.title}>Změna hesla
            </Typography>
            <form>
              <Grid container direction="column" justify="center" alignItems="center">
                <TextField
                  id="password"
                  placeholder="heslo"
                  className={classes.textfield}
                  onChange={this.saveInput}
                  error={inputErrors.password}
                  type="password"
                  >
                </TextField>
                <TextField
                  id="passwordCheck"
                  placeholder="znova heslo"
                  className={classes.textfield}
                  onChange={this.saveInput}
                  error={inputErrors.passwordCheck}
                  type="password"
                  >
                </TextField>
              </Grid>
            </form>
            <Button
              variant="contained"
              color="secondary"
              className={classes.btn}
              onClick={this.changePassword}
              disabled={disabledBtn}
              >
              Změnit heslo
            </Button>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ChangePasswordPage)
