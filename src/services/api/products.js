import httpCommon from '../http-common'

let request = httpCommon.request

function getAll () {
  return request({
    url: '/product/all',
    method: 'GET'
  })
}

function add (data) {
  return request({
    url: `/product/create`,
    method: 'POST',
    data: data || {}
  })
}

function uploadFile (file) {
  return request({
    url: `/product/upload`,
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: file || {}
  })
}

function getOne (id) {
  return request({
    url: `/product/one/${id}`,
    method: 'GET'
  })
}

function getImage (img) {
  return request({
    url: `/product/image/${img}`,
    method: 'GET'
  })
}

function update (id, data) {
  return request({
    url: `/product/update/${id}`,
    method: 'PUT',
    data: data || {}
  })
}

function destroy (id) {
  return request({
    url: `/product/delete/${id}`,
    method: 'DELETE'
  })
}

const ProductsService = {
  getAll,
  add,
  getOne,
  getImage,
  update,
  destroy,
  uploadFile
}

export default ProductsService
