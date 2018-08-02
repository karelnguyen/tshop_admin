import React from 'react'
import ProductCatalogPage from './ProductCatalogPage'
// Material-ui
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: '#e5e6e8',
  },
  tabItem: {
    height: '300px'
  }
})

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  )
}

class SettingsPage extends React.Component {
  constructor () {
    super()
    this.state = {
      value: 0
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render () {
    const { classes } = this.props
    const { value } = this.state
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            centered={true}
            fullWidth={true}
          >
            <Tab label="Seznam uživatelů" />
            <Tab label="Změna hesla" />
            <Tab label="Nastavení 3" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><ProductCatalogPage/></TabContainer>}
        {value === 1 && <TabContainer><ProductCatalogPage/></TabContainer>}
        {value === 2 && <TabContainer><ProductCatalogPage/></TabContainer>}
      </div>
    )
  }
}

export default withStyles(styles)(SettingsPage)
