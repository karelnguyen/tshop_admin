import React from 'react'
import { shallow } from 'enzyme'
import httpCommon from '../../../services/http-common'
import UsersTable from '../UsersTable'
import allUsers from '../../../__mocks__/allUsers'

describe('UsersTable methods:', () => {
  // .dive, because there is a HOC, more HOC need more .dive
  const mock = httpCommon.mock
  const wrapper = shallow(<UsersTable />).dive()
  const wi = wrapper.instance()

  it('Test handleChangePage()', () => {
    let event = {}
    wi.handleChangePage(event, 5)
    expect(wrapper.state('page')).toBe(5)
  })

  it('Test handleChangeRowsPerPage()', () => {
    let event = {
      target: {
        value: 42
      }
    }
    wi.handleChangeRowsPerPage(event)
    expect(wrapper.state('rowsPerPage')).toBe(42)
  })

  it('Test getAllUsers()', async () => {
    mock.onGet('/user/all').reply(200, allUsers)
    await wi.getAllUsers()
    expect(wrapper.state('allUsers')).toEqual(allUsers)
  })
})
