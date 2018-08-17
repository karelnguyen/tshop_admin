import React from 'react'
import { shallow } from 'enzyme'
import Drawer from '../Drawer'

describe('Drawer methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<Drawer />).dive()
  const wi = wrapper.instance()

  it('Test toggleDrawer()', () => {
    wrapper.setState({ openDrawer: false })
    wi.toggleDrawer()
    expect(wrapper.state('openDrawer')).toBe(true)
  })
})
