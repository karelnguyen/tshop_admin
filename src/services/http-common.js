import axios from 'axios'

const client = axios.create({ baseURL: 'https://sheltered-caverns-10503.herokuapp.com/' })

const setHeaderToken = (token) => {
  client.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

// Request Wrapper
const request = (options) => {

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
  setHeaderToken,
}

export default httpCommon
