import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const AppBarWrapper = styled.div`
  position: fix;
  top: 0;
  witdh: 100vw;
`

function Appbar() {
  return (
    <AppBarWrapper >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" >
            Title
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </AppBarWrapper>
  )
}

export default Appbar
