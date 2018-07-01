import React from 'react'
import ProductsService from '../services/api/products'
import ProductsTable from '../components/tables/ProductsTable'

class ProductCatalog extends React.Component {
  state = {
    products: []
  }

  getAllProducts () {
    return ProductsService
      .getAll()
      .then(response => {
        this.setState({products: response.data})
      })
      .catch(err => {
        console.error('Err!', err)
      })
  }

  componentDidMount () {
    this.getAllProducts()
  }

  render() {
    const { state } = this.state
    return (
      <div>
        <h1>Produktový katalog</h1>
        <ProductsTable products={this.state.products}/>
      </div>
    )
  }
}

export default ProductCatalog
