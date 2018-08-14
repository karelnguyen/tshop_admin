import React from 'react'
import { shallow } from 'enzyme'
import DeleteProductDialog from '../DeleteProductDialog'

describe('DeleteProductDialog', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<DeleteProductDialog />).dive()
  const fn = wrapper.instance()

  it('test opening delete product dialog', () => {
    fn.handleClickOpen()
    expect(wrapper.state('open')).toBe(true)
  })

  it('test closing delete product dialog', () => {
    fn.handleClose()
    expect(wrapper.state('open')).toBe(false)
  })
})
