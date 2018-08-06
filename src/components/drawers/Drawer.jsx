import React from 'react'
import { Link } from 'react-router-dom'
// Material-ui
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import MenuIcon from '@material-ui/icons/Dashboard'


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
    drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  link: {
    textDecoration: 'none',
  },
  btn: {
    marginLeft: '50px'
  }
})

class MainDrawer extends React.Component {
  state = {
    openDrawer: false
  }

  toggleDrawer () {
    const drawerBool = this.state.openDrawer
    this.setState({ openDrawer: !drawerBool })
  }

  render () {
    const { openDrawer } = this.state
    const { classes } = this.props
    return (
      <div>
        <Button variant="fab" color="secondary" onClick={this.toggleDrawer.bind(this)} className={classes.btn}>
          <MenuIcon />
        </Button>
        <Drawer
          open={openDrawer}
          onClose={this.toggleDrawer.bind(this)}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Button variant="contained" color="secondary" onClick={this.toggleDrawer.bind(this)}>close </Button>
          <Divider />
          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <Typography variant="subheading" gutterBottom>
                  Dashboard
                </Typography>
              </ListItem>
            </Link>
          </List>
          <Divider />
            <Link to="/login" className={classes.link}>
              <ListItem button>
                <Typography variant="subheading" gutterBottom>
                  Login
                </Typography>
              </ListItem>
            </Link>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(MainDrawer)
