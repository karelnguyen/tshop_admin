import React from 'react'
import { shallow } from 'enzyme'
import httpCommon from '../../../services/http-common'
import ProductDetailDialog from '../ProductDetailDialog'
import productDetails from '../../../__mocks__/productDetails'

describe('ProductDetailDialog methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const mock = httpCommon.mock
  const wrapper = shallow(<ProductDetailDialog />).dive()
  const wi = wrapper.instance()

  it('Test get product detail & show product detail', async () => {
    mock.onGet('/product/one/10').reply(200, productDetails)
    wrapper.setProps({ id: 10 })
    await wi.showProductDetail()
    expect(wrapper.state('productDetails')).toEqual(productDetails)
    expect(wrapper.state('productDetailBool')).toBe(true)
    expect(wrapper.state('imageArray')).toEqual(['migos.png'])
  })

  it('Test hide product detail', () => {
    wrapper.setState({ productDetailBool: true })
    wi.hideProductDetail()
    expect(wrapper.state('productDetailBool')).toBe(false)
    expect(wrapper.state('imageArray')).toEqual([])
  })
})
