import httpCommon from '../http-common'

let request = httpCommon.request

function login (username, password) {
  return request({
    url: '/user/signin',
    method: 'POST',
    data: {'email': username, 'password': password}
  }).then(response => {
    const token = response.data.good.token
    localStorage.setItem('token', token)
    localStorage.setItem('user', response.data.email)
    localStorage.setItem('id', response.data.id)
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
  localStorage.clear()
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
