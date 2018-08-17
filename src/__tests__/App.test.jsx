import React from 'react'
import { shallow } from 'enzyme'
import httpCommon from '../services/http-common'
import App from '../App'
import productDetails from '../__mocks__/productDetails'

describe('App methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const mock = httpCommon.mock
  const wrapper = shallow(<App />).dive()
  const wi = wrapper.instance()

  it('Test isTokenExpired()', () => {
    mock.onGet('/user/all').reply(401)
    wi.isTokenExpired()
  })

  it('Test logout()', () => {
    wi.logout()
  })
})
