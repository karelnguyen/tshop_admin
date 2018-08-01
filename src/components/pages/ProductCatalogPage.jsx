import React from 'react'
import ProductsService from '../../services/api/products'
import ProductsTable from '../tables/ProductsTable'
import Grid from '@material-ui/core/Grid'

class ProductCatalog extends React.Component {
  state = {
    products: []
  }

  getAllProducts () {
    return ProductsService
      .getAll()
      .then(response => {
        this.setState({ products: response.data })
      })
      .catch(err => {
        console.error('Err!', err)
      })
  }

  componentDidMount () {
    this.getAllProducts()
  }

  render() {
    const { products } = this.state
    return (
      <Grid container justify="center">
        <ProductsTable tableData={products}/>
      </Grid>
    )
  }
}

export default ProductCatalog
