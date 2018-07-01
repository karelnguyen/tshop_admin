import React, { Component } from 'react'
import ProductsService from '../services/api/products'
import ProductsTable from '../components/tables/ProductsTable'

class ProductCatalog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
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
    return (
      <div>
        <ProductsTable />
      </div>
    )
  }
}

export default ProductCatalog
