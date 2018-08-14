import React from 'react'
import { shallow } from 'enzyme'
import ProductDetailDialog from '../ProductDetailDialog'

describe('ProductDetailDialog methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<ProductDetailDialog />).dive()
  const fn = wrapper.instance()

  it('test get product detail & show product detail', async () => {
    const imgArr = {
      img: ['image']
    }
    wrapper.setState({ productDetails: imgArr })
    wrapper.setProps({ id: 10 })
    await fn.showProductDetail()
    expect(wrapper.state('imageArray')).toEqual(['image'])
    expect(wrapper.state('productDetailBool')).toBe(true)
  })

  it('test hide product detail', () => {
    wrapper.setState({ productDetailBool: true })
    fn.hideProductDetail()
    expect(wrapper.state('productDetailBool')).toBe(false)
    expect(wrapper.state('imageArray')).toEqual([])
  })
})
