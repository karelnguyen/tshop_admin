import axios from 'axios'

const client = axios.create({ baseURL: 'https://mladejvlcak.herokuapp.com' })

// TODO: behaviours before response
// client.interceptors.response.use(response => {
//   return response
// })

// Request Wrapper
const request = (options) => {
  const onSuccess = (response) => {
    console.log('Request Successful!', response)
    console.log('Request Data', response.data)
    return response
  }

  const onError = (error) => {
    console.log('Request failed: ', error)
    return Promise.reject(error.response)
  }

  return client(options)
    .then(onSuccess)
    .catch(onError)
}

const httpCommon = {
  client,
  request
}

export default httpCommon
