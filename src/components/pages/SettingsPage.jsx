import React from 'react'
import SignUpPage from './SignUpPage'
import ChangePasswordPage from './ChangePasswordPage'
import UsersTable from '../tables/UsersTable'
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
      settingsPageIndex: 0,
    }
  }

  handleChange = (event, settingsPageIndex) => {
    this.setState({ settingsPageIndex })
  }

  render () {
    const { classes } = this.props
    const { settingsPageIndex } = this.state
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Tabs
            value={settingsPageIndex}
            onChange={this.handleChange}
            indicatorColor="secondary"
            centered={true}
            fullWidth={true}
          >
            <Tab label="Seznam uživatelů" />
            <Tab label="Změna hesla" />
            <Tab label="Přidat uživatele" />
          </Tabs>
        </AppBar>
        {settingsPageIndex === 0 && <TabContainer><UsersTable /></TabContainer>}
        {settingsPageIndex === 1 && <TabContainer><ChangePasswordPage /></TabContainer>}
        {settingsPageIndex === 2 && <TabContainer><SignUpPage /></TabContainer>}
      </div>
    )
  }
}

export default withStyles(styles)(SettingsPage)
