import httpCommon from '../http-common'

let request = httpCommon.request

function login (username, password) {
  return request({
    url: '/user/signin',
    method: 'POST',
    data: {'email': username, 'password': password}
  })
  .then(response => {
    localStorage.setItem('token', response.data.good.token)
    window.location.reload()
  })
}

function logout () {
  localStorage.removeItem('token')
  window.location.reload()
}

function isAuthenticated () {
  if (localStorage.getItem('token')) {
    return true
  } else {
    return false
  }
}

const AuthService = {
  login,
  logout,
  isAuthenticated,
}

export default AuthService
