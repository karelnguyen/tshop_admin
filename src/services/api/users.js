import httpCommon from '../http-common'

const userId = localStorage.getItem('id')

let request = httpCommon.request

function getAll () {
  return request ({
    url: '/user/all',
    method: 'GET',
  })
}

function deleteUser () {
  return request ({
    url: `/user/remove/${userId}`,
    method: 'DELETE',
  })
}

function changePassword (password) {
  return request ({
    url: `/user/changePasswd/${userId}`,
    method: 'PUT',
    data: {'password': password}
  })
}

const UsersService = {
  getAll,
  deleteUser,
  changePassword,
}

export default UsersService
