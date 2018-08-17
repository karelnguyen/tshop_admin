import React from 'react'
import { shallow } from 'enzyme'
import SignUpPage from '../SignUpPage'
import httpCommon from '../../../services/http-common'
import allProducts from '../../../__mocks__/allProducts'

describe('SignUpPage methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<SignUpPage />).dive()
  const wi = wrapper.instance()
  const mock = httpCommon.mock

  it('Test saveInput() & toggleSignButton()', () => {
    let event = {
      target: {
        id: 'email',
        value: 'karel@je.buh'
      }
    }
    wi.saveInput(event)
    expect(wrapper.state('email')).toEqual('karel@je.buh')
    expect(wrapper.state('validation').email).toEqual(true)
    expect(wrapper.state('inputErrors').email).toEqual(false)
    expect(wrapper.state('disabledSignUpBtn')).toEqual(true)
    event = {
      target: {
        id: 'password',
        value: '42'
      }
    }
    wi.saveInput(event)
    event = {
      target: {
        id: 'passwordCheck',
        value: '42'
      }
    }
    wi.saveInput(event)
    expect(wrapper.state('disabledSignUpBtn')).toEqual(false)
  })

  it('Test signUp()', async () => {
    mock.onPost('/user/signup').reply(200)
    await wi.signUp()
    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
    expect(wrapper.state('passwordCheck')).toEqual('')
    expect(wrapper.state('showUserAddedBar')).toEqual(true)
    expect(wrapper.state('disabledSignUpBtn')).toEqual(true)
    mock.onPost('/user/signup').reply(500)
    await wi.signUp()
    expect(wrapper.state('showSignUpErrorBar')).toBe(true)
  })

  it('Test closeBars()', () => {
    wi.closeBars()
    expect(wrapper.state('showSignUpErrorBar')).toBe(false)
    expect(wrapper.state('showUserAddedBar')).toBe(false)
  })
})
