import React from 'react'
import {shallow} from 'enzyme'

import FindSalons from 'app/components/elems/FindSalons'
import Gallery from 'app/components/elems/Gallery'
import {Tabs} from 'antd'

const Tab = Tabs.TabPane
let findSalons

beforeEach(() => findSalons = shallow(<FindSalons/>))

describe('<FindSalons/>', () => {
  it('shows 2 galleries', () => {
    expect(findSalons.find(Gallery).length).toEqual(2)
  })

  it('shows 2 tabs', () => {
    expect(findSalons.find(Tab).length).toEqual(2)
  })
})
