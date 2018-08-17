import React from 'react'
import { shallow } from 'enzyme'
import HomePage from '../HomePage'
import httpCommon from '../../../services/http-common'
import allProducts from '../../../__mocks__/allProducts'

describe('HomePage methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<HomePage />).dive()
  const wi = wrapper.instance()
  const mock = httpCommon.mock

  it('', () => {})
})
