import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ProductCatalogPage from './pages/ProductCatalogPage'
import AddProductPage from './pages/AddProductPage'
import Home from './pages/Home'
import { Route, Link, Switch, Redirect } from 'react-router-dom'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    overflowY: 'scroll',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
  }
})

function App (props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Eshop administrator
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <Typography variant="subheading" gutterBottom>
                Home
              </Typography>
            </ListItem>
          </Link>
          <Link to="/product-catalog" className={classes.link}>
            <ListItem button>
              <Typography variant="subheading" gutterBottom>
                Produktový katalog
              </Typography>
            </ListItem>
          </Link>
          <Link to="/add-product" className={classes.link}>
            <ListItem button>
              <Typography variant="subheading" gutterBottom>
                Přidat produkt
              </Typography>
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product-catalog" component={ProductCatalogPage} />
          <Route path="/add-product" component={AddProductPage} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}

export default withStyles(styles)(App)
