import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const baseURL = 'https://mladejvlcak.herokuapp.com/'

const client = axios.create({ baseURL })

let mock = new MockAdapter(client, { delayResponse: 500 })
if (process.env.NODE_ENV !== 'test') {
  mock.restore()
} else {
  mock = new MockAdapter(client)
}

const setHeaderToken = (token) => {
  client.defaults.headers.common['Authorization'] = token
}

const request = (options) => {
  const onSuccess = (response) => {
    return response
  }
  const onError = (error) => {
    return Promise.reject(error.response)
  }
  return client(options)
    .then(onSuccess)
    .catch(onError)
}

const httpCommon = {
  client,
  request,
  setHeaderToken,
  baseURL,
  mock,
}

export default httpCommon
