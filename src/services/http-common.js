import axios from 'axios'

const baseURL = 'https://mladejvlcak.herokuapp.com/'

const client = axios.create({ baseURL })

function setHeaderToken (token) {
  client.defaults.headers.common['Authorization'] = token
}

// Request Wrapper
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
}

export default httpCommon
