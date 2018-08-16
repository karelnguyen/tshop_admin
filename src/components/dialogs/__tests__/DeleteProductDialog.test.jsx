import React from 'react'
import { shallow } from 'enzyme'
import DeleteProductDialog from '../DeleteProductDialog'

describe('DeleteProductDialog methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<DeleteProductDialog />).dive()
  const fn = wrapper.instance()

  it('Test opening delete product dialog', () => {
    fn.handleClickOpen()
    expect(wrapper.state('open')).toBe(true)
  })

  it('Test closing delete product dialog', () => {
    fn.handleClose()
    expect(wrapper.state('open')).toBe(false)
  })
})
