import React from 'react'
import ProductsService from '../../services/api/products'
import ProductsTable from '../tables/ProductsTable'
import Grid from '@material-ui/core/Grid'

class ProductCatalog extends React.Component {
  constructor() {
    super()
    this.getAllProducts = this.getAllProducts.bind(this)
    this.state = {
      products: []
    }
  }

  getAllProducts () {
    return ProductsService
      .getAll()
      .then(response => {
        this.setState({ products: response.data })
      })
      .catch(err => {})
  }

  componentDidMount () {
    this.getAllProducts()
  }

  render() {
    const { products } = this.state
    return (
      <Grid container justify="center">
        <ProductsTable tableData={products} rerenderProducts={this.getAllProducts}/>
      </Grid>
    )
  }
}

export default ProductCatalog
