import React from 'react'
import { shallow } from 'enzyme'
import AddProductPage from '../AddProductPage'
import httpCommon from '../../../services/http-common'
import allProducts from '../../../__mocks__/allProducts'

describe('AddProductPage methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const wrapper = shallow(<AddProductPage />).dive()
  const wi = wrapper.instance()
  const mock = httpCommon.mock

  it('Test addProduct() & getAllProducts()', async () => {
    mock.onGet('/product/all').reply(200, allProducts)
    mock.onPost('/product/create').reply(200)
    await wi.addProduct()
    // getAllProducts()
    expect(wrapper.state('allProducts')).toEqual(allProducts)
    // addProduct()
    expect(wrapper.state('input')).toEqual({
      color: '',
      heading: '',
      longText: '',
      price: '',
      shortText: ''
    })
    expect(wrapper.state('size')).toEqual('')
    expect(wrapper.state('inputErrors')).toEqual({})
    expect(wrapper.state('validation')).toEqual({})
    expect(wrapper.state('disabledAddBtn')).toEqual(true)
    expect(wrapper.state('image')).toEqual(null)
    expect(wrapper.state('showBar')).toEqual(true)
  })

  it('Test saveInputData() & toggleAddButton()', () => {
    let event = {
      target: {
        id: 'id',
        value: 1000
      }
    }
    wi.saveInputData(event)
    expect(wrapper.state('input').id).toEqual(1000)
    expect(wrapper.state('validation')).toEqual({"id": true})
    expect(wrapper.state('disabledAddBtn')).toEqual(false)
  })

  it('Test handleSize()', () => {
    let event = {
      target: {
        files: ['migos.png']
      }
    }
    wi.saveFile(event)
    expect(wrapper.state('image')).toEqual('migos.png')
  })

  it('Test closeBars()', () => {
    wi.closeBars('asd')
    expect(wrapper.state('showBar')).toEqual(false)
  })

  it('Test fileUpload()', () => {
    wi.fileUpload()
  })
})
