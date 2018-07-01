import React from 'react'
import styled from 'styled-components'
import ProductCatalog from '../../pages/ProductCatalog'

const Board = styled.div`
  background-color: blue;
  // height: 100vh;
  // width: 100%;
  // top: 0;
`

class Dashboard extends React.Component {
  render() {
    return (
      <Board>
        <ProductCatalog />
      </Board>
    )
  }
}

export default Dashboard
