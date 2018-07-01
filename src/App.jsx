import React from 'react'
import styled from 'styled-components'
import Drawer from './components/sidebars/Drawer'
import Dashboard from './components/boards/Dashboard'
import TopBar from './components/layout/Appbar'

const Application = styled.div`
  // width: 100vw;
  // height: 100vh;
  // box-sizing: border-box;
  // display: flex;
`

class App extends React.Component {
  render() {
    return (
      <Application>
        <TopBar />
        <Drawer />
        <Dashboard />
      </Application>
    )
  }
}

export default App
