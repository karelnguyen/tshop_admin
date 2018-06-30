import React, { Component } from 'react'
import ProductsService from '../services/api/products'

class ProductCatalog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }

  allProducts () {
    return ProductsService
      .getAllProducts()
      .then(response => {
        this.setState({products: response.data})
      })
      .catch(err => {
        console.error('Err!', err)
      })
  }

  componentDidMount () {
    this.allProducts()
  }

  render() {
    return (
      <div>ProductCatalog</div>
    )
  }
}

export default ProductCatalog
