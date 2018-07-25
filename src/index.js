import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import LoginPage from './pages/LoginPage'
import './index.css'
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter >
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={LoginPage} />
    </div>
  </BrowserRouter>
  , document.getElementById('root'))
