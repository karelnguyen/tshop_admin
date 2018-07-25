import React from 'react'
import MainDrawer from './components/drawers/Drawer'
import { Route, Switch, Redirect } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductCatalogPage from './pages/ProductCatalogPage'
import AddProductPage from './pages/AddProductPage'
import LoginPage from './pages/LoginPage'
// Material-ui
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
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
            </Toolbar>
          </AppBar>
          <div className={classes.toolbar} />
            <Grid container justify="center" className={classes.mainContent}>
              <Grid item>
                <HomePage />
              </Grid>
            </Grid>
            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
        </main>
      </div>
    )
  }
}


// App = withStyles(styles)(App)
// export default withAuth(App)

export default withStyles(styles)(App)
