import React from 'react'
import { shallow } from 'enzyme'
import LoginPage from '../LoginPage'
import httpCommon from '../../../services/http-common'
import allProducts from '../../../__mocks__/allProducts'

describe('LoginPage methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<LoginPage />).dive()
  const wi = wrapper.instance()
  const mock = httpCommon.mock

  it('Test handleChange() & togglLoginButton()', () => {
    let event = {
      target: {
        id: 'email',
        value: 'karel@je.buh'
      }
    }
    wi.handleChange(event)
    expect(wrapper.state('email')).toEqual('karel@je.buh')
    expect(wrapper.state('validation').email).toBe(true)
    expect(wrapper.state('inputErrors').email).toBe(false)
    expect(wrapper.state('disabledLoginBtn')).toBe(true)
    event = {
      target: {
        id: 'password',
        value: 'bflmpsvz'
      }
    }
    wi.handleChange(event)
    expect(wrapper.state('disabledLoginBtn')).toBe(false)
  })

  it('Test login()', async () => {
    await wi.login()
    expect(wrapper.state('showLoginErrorBar')).toBe(true)
  })

  it('Test closeLoginErrorBar()', () => {
    wi.closeLoginErrorBar()
    expect(wrapper.state('showLoginErrorBar')).toBe(false)
  })
})
