import React, { Component } from 'react'
import styled from 'styled-components'
// import ProductCatalog from './pages/ProductCatalog'
import Sidebar from './components/sidebars/Sidebar'

const Application = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
`

class App extends Component {
  render() {
    return (
      <Application>
        <Sidebar />
      </Application>
    )
  }
}

export default App;
