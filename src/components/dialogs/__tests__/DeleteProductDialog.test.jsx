import React from 'react'
import { shallow } from 'enzyme'
import DeleteProductDialog from '../DeleteProductDialog'

describe('DeleteProductDialog methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<DeleteProductDialog />).dive()
  const wi = wrapper.instance()

  it('Test handleClickOpen()', () => {
    wi.handleClickOpen()
    expect(wrapper.state('open')).toBe(true)
  })

  it('Test handleClose()', () => {
    wi.handleClose()
    expect(wrapper.state('open')).toBe(false)
  })

  it('Test deleteProduct()', () => {
    wi.deleteProduct(10)
  })
})
