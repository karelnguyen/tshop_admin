import React from 'react'
import HomePage from './components/pages/HomePage'
import AuthService from './services/auth/authService'
import MainDrawer from './components/drawers/Drawer'
// Material-ui
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

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
    backgroundColor: '#343434',
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
  accountIcon: {
    marginRight: '7px'
  },
  title: {
  },
  logoutBtn: {
    marginRight: '50px',
    marginLeft: '20px'
  },
  drawer: {
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
              <Grid container justify="space-between" alignItems="center">
                <MainDrawer className={classes.drawer}/>
                <Typography variant="title" color="inherit" noWrap className={classes.title}>
                  Tshop admin
                </Typography>
                <span>
                  <Grid container alignItems="center" justify="center">
                    <AccountCircleIcon className={classes.accountIcon}/>
                    <Typography color="inherit" variant="subheading">{localStorage.getItem('user')}</Typography>
                    <Button variant="contained" color="secondary" onClick={this.logout} className={classes.logoutBtn}>Logout</Button>
                  </Grid>
                </span>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.toolbar} />
            <Grid container justify="center" className={classes.mainContent}>
              <Grid item md={10} lg={8}>
                <HomePage />
              </Grid>
            </Grid>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
