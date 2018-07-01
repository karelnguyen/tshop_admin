import httpCommon from '../http-common'

let request = httpCommon.request

function getAll () {
  return request({
    url: '/p/all',
    method: 'GET'
  })
}

function add (data) {
  return request({
    url: `/p/create`,
    method: 'POST',
    data: data || {}
  })
}

const ProductsService = {
  getAll,
  add
}

export default ProductsService
