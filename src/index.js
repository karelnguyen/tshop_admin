import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import LoginPage from './components/pages/LoginPage'
import AuthService from './services/auth/authService'
import './index.css'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      AuthService.isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
    )} />
)

ReactDOM.render(
  <Router>
    <div>
      <PrivateRoute exact path="/" component={App} />
      <Route path="/login" component={LoginPage} />
    </div>
  </Router>
  , document.getElementById('root'))
