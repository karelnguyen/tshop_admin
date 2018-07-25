import React from 'react'
import ProductsService from '../services/api/products'
import ProductsTable from '../components/tables/ProductsTable'
import Typography from '@material-ui/core/Typography'

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
      <div>
        <Typography variant="display1" gutterBottom color="primary">
          Produkt katalog
        </Typography>
        <ProductsTable tableData={products}/>
      </div>
    )
  }
}

export default ProductCatalog
