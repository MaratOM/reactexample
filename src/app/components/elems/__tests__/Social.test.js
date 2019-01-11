import React from 'react'
import {shallow} from 'enzyme'

import Social from 'app/components/elems/Social'
import {Icon} from 'antd'

describe('<Social/>', () => {
  it('shows icons', () => {
    const social = shallow(<Social/>)

    expect(social.find(Icon).length).toEqual(3)
  })
})
