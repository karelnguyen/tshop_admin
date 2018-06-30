import httpCommon from '../http-common'

let request = httpCommon.request

function getAllProducts () {
  return request({
    url: '/p/all',
    method: 'GET'
  })
}

const ProductsService = {
  getAllProducts
}

export default ProductsService
