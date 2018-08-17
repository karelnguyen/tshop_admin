import React from 'react'
import { shallow } from 'enzyme'
import SettingsPage from '../SettingsPage'
import httpCommon from '../../../services/http-common'
import allProducts from '../../../__mocks__/allProducts'

describe('SettingsPage methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<SettingsPage />).dive()
  const wi = wrapper.instance()
  const mock = httpCommon.mock

  it('', () => {})
})
