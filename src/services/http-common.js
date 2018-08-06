import axios from 'axios'

const client = axios.create({ baseURL: 'https://mladejvlcak.herokuapp.com/' })
// const client = axios.create({ baseURL: 'http://localhost:3001/' })

// Request Wrapper
const request = (options) => {
  const token = localStorage.getItem('token')
  client.defaults.headers.common['Authorization'] = token

  const onSuccess = (response) => {
    // console.log('Request OK, request data:', response.data)
    return response
  }

  const onError = (error) => {
    // console.log('Request failed: ', error)
    return Promise.reject(error.response)
  }

  return client(options)
    .then(onSuccess)
    .catch(onError)
}

const httpCommon = {
  client,
  request,
}

export default httpCommon
