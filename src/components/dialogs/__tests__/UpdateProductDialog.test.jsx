import React from 'react'
import { shallow } from 'enzyme'
import httpCommon from '../../../services/http-common'
import UpdateProductDialog from '../UpdateProductDialog'
import productDetails from '../../../__mocks__/productDetails'

describe('UpdateProductDialog methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const mock = httpCommon.mock
  const wrapper = shallow(<UpdateProductDialog tableData={productDetails} />).dive()
  const wi = wrapper.instance()


  it('Test closeBars()', () => {
    wrapper.setState({ showBar: true })
    wi.closeBars('test')
    expect(wrapper.state('showBar')).toBe(false)
  })

  it('Test handleClickOpen()', () => {
    wrapper.setState({ open: false })
    wi.handleClickOpen()
    expect(wrapper.state('open')).toBe(true)
  })

  it('Test handleClose()', () => {
    wrapper.setState({ open: true })
    wi.handleClose()
    expect(wrapper.state('open')).toBe(false)
  })

  it('Test saveInputData() & toggleAddButton()', () => {
    let event = {
      target: {
        id: 'id',
        value: '1000'
      }
    }
    wi.saveInputData(event)
    expect(wrapper.state('input').id).toEqual('1000')
    expect(wrapper.state('validation')).toEqual({"id": false})
    expect(wrapper.state('updateBtnBool')).toEqual(false)
  })

  it('Test updateProduct()', async () => {
    mock.onPut(`/product/update/12`).reply(200)
    await wi.updateProduct(12)
    expect(wrapper.state('open')).toEqual(false)
    expect(wrapper.state('showBar')).toEqual(true)
  })
})
