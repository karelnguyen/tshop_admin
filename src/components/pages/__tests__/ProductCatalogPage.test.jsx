import React from 'react'
import { shallow } from 'enzyme'
import ProductCatalogPage from '../ProductCatalogPage'
import httpCommon from '../../../services/http-common'
import allProducts from '../../../__mocks__/allProducts'

describe('ProductCatalogPage methods:', () => {
  const wrapper = shallow(<ProductCatalogPage />)
  const wi = wrapper.instance()
  const mock = httpCommon.mock

  it('Test getAllProducts', async () => {
    mock.onGet('/product/all').reply(200, allProducts)
    await wi.getAllProducts()
    expect(wrapper.state('products')).toEqual(allProducts)
  })
})
