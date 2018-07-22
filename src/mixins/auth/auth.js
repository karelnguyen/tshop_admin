import decode from "jwt-decode"
import UsersService from "../services/api/users"

// http://jasonwatmore.com/post/2017/12/07/react-redux-jwt-authentication-tutorial-example

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || "https://mladejvlcak.herokuapp.com/user/" // API server domain
    this.fetch = this.fetch.bind(this) // React binding stuff
    this.login = this.login.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  login(username, password) {
    return UsersService.signIn(username, password).then(response => {
      setToken(res.token)
      return Promise.resolve(res)
    })
  }

  isLoggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken() // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token) // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token)
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true
      } else return false
    } catch (err) {
      return false
    }
  }

  // Saves user token to localStorage
  setToken(idToken) {
    localStorage.setItem("id_token", idToken)
  }

  // Retrieves the user token from localStorage
  getToken() {
    return localStorage.getItem("id_token")
  }

  // Clear user token and profile data from localStorage
  logout() {
    localStorage.removeItem("id_token")
  }

  // Using jwt-decode npm package to decode the token
  getProfile() {
    return decode(this.getToken())
  }

  // performs api calls sending the required authentication headers
  fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    }

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  // raises an error in case response status is not a success
  _checkStatus(response) {
    // Success status lies between 200 to 300
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}
