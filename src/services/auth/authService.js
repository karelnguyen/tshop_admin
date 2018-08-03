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
    localStorage.setItem('user', response.data.username)
    window.location.reload()
  })
}

function signUp (username, password) {
  return request({
    url: 'user/signup',
    method: 'POST',
    data: {'email': username, 'password': password}
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
  signUp,
}

export default AuthService
