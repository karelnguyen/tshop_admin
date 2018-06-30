import React, { Component } from 'react'
import styled from 'styled-components'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const Drawer = styled.div`
  border-right-style: solid;
  width: 300px;
  height: 100vh;
`

class Sidebar extends Component {
  render() {
    return (
      <div>
        <Drawer>
          <List>
            <ListItem>
              Produktový katalog
            </ListItem>
            <Divider />
          </List>
        </Drawer>
      </div>
    )
  }
}

export default Sidebar
