import React from 'react'
import { shallow } from 'enzyme'
import ChangePasswordPage from '../ChangePasswordPage'
import httpCommon from '../../../services/http-common'

describe('ChangePasswordPage methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<ChangePasswordPage />).dive()
  const wi = wrapper.instance()
  const mock = httpCommon.mock

  it('Test saveInputData() & toggleAddButton()', () => {
    let event = {
      target: {
        id: 'password',
        value: 'bflmpsvz'
      }
    }
    wi.saveInput(event)
    expect(wrapper.state('password')).toEqual('bflmpsvz')
    expect(wrapper.state('validation')).toEqual({password: true})
    expect(wrapper.state('inputErrors')).toEqual({password: false})
    expect(wrapper.state('disabledBtn')).toBe(true)
    event = {
      target: {
        id: 'passwordCheck',
        value: 'bflmpsvz'
      }
    }
    wi.saveInput(event)
    expect(wrapper.state('disabledBtn')).toBe(false)
  })

  it('Test changePassword()', () => {
    wi.changePassword()
  })

})
