import React from 'react'
import { shallow } from 'enzyme'
import httpCommon from '../../../services/http-common'
import ProductsTable from '../ProductsTable'
import allProducts from '../../../__mocks__/allProducts'

describe('ProductsTable methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const mock = httpCommon.mock
  const wrapper = shallow(<ProductsTable tableData={allProducts}/>).dive()
  const wi = wrapper.instance()

  it('Test handleChangePage()', () => {
    let event = {}
    wi.handleChangePage(event, 5)
    expect(wrapper.state('page')).toEqual(5)
  })

  it('Test logout()', () => {
    let event = {
      target: {
        value: 42
      }
    }
    wi.handleChangeRowsPerPage(event)
    expect(wrapper.state('rowsPerPage')).toEqual(42)
  })

  it('Test handleSelectAllClick()', () => {
    let event = {}
    wi.handleSelectAllClick(event, true)
    expect(wrapper.state('selected')).toEqual([ '15', '16', '17', '19', '20', '10999', '11000', '11001' ])
    wi.handleSelectAllClick(event, false)
    expect(wrapper.state('selected')).toEqual([])
  })

  it('Test handleClick()', () => {
    let event = {}
    wi.handleClick(event, [15, 16, 17])
    expect(wrapper.state('selected')).toEqual([15, 16, 17])
  })

  it('Test deleteSelectedProducts()', () => {
    mock.onAny('/product/delete/15').reply(200)
    wi.deleteSelectedProducts()
  })
})
