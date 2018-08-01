import React from 'react'
import HomePage from './components/pages/HomePage'
import AuthService from './services/auth/authService'
// Material-ui
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    overflowY: 'scroll',
    flexGrow: 1,
    backgroundColor: '#e2e0e0',
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
  title: {
    marginLeft: '50px'
  }
})

class App extends React.Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  logout () {
    AuthService
      .logout()
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                TSHOP
              </Typography>
              <Button onClick={this.logout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <div className={classes.toolbar} />
            <Grid container justify="center" className={classes.mainContent}>
              <Grid item>
                <HomePage />
              </Grid>
            </Grid>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
