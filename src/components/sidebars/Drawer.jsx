import React from 'react'
import styled from 'styled-components'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const DrawerWrapper = styled.div`
  width: 240px;
  height: 100vh;
  // background-color: black;
  position: fixed;
`

class Drawer extends React.Component {
  state = {
    open: false
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { anchor, open } = this.state
    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}>
      </Drawer>
    )
    let before = null
    let after = null
    if (anchor === 'left') {
      before = drawer
    } else {
      after = drawer
    }

    return (
      <DrawerWrapper>hovno</DrawerWrapper>
    )
  }
}

export default Drawer
