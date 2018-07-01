import React from 'react'
import ProductsService from '../services/api/products'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const InnerWrapper = styled.div`
  padding: 20px;
`
// TODO: dodelat, ted je to jak hovno
class AddProductPage extends React.Component {
  state = {
    products: []
  }

  addProduct () {
    return ProductsService
      .add()
  }

  render () {
    return (
      <div>
        <h1>Přidat produkt</h1>
        <Paper>
          <InnerWrapper>
            <TextField
              id="id"
              label="id"
              placeholder="123"
              margin="normal"
            />
            <TextField
              id="id"
              label="id"
              placeholder="123"
              margin="normal"
            />
            <TextField
              id="id"
              label="id"
              placeholder="123"
              margin="normal"
            />
            <Tooltip id="tooltip-fab" title="Add">
              <Button variant="fab" color="primary" aria-label="Add">
                <AddIcon />
              </Button>
            </Tooltip>
          </InnerWrapper>
        </Paper>
      </div>
    )
  }
}

export default AddProductPage
