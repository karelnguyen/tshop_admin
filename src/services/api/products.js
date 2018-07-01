import httpCommon from '../http-common'

let request = httpCommon.request

function getAll () {
  return request({
    url: '/p/all',
    method: 'GET'
  })
}

function add (id) {
  return request({
    url: `/p/${id}`,
    method: 'POST'
  })
}

const ProductsService = {
  getAll
}

export default ProductsService
