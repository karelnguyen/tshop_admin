import httpCommon from '../http-common'

let request = httpCommon.request

function signIn (username, password) {
  return request({
    url: '/user/signin'
    method: 'POST',
    body: {
      username, password
    }
  })
}

const UsersService = {
  login
}

export default UsersService
