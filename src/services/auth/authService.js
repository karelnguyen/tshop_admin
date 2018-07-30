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
  })
}

function logout () {
  localStorage.removeItem('token')
}

const AuthService = {
  login,
  logout,
}

export default AuthService
