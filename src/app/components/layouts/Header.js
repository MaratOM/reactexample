import React, {Component, Fragment} from 'react'

import BurgerMenu from 'app/components/elems/menu/BurgerMenu'
import TopRegion from './TopRegion'

class Header extends Component {
  render() {
    return <Fragment>
      <BurgerMenu/>
      <TopRegion/>
    </Fragment>
  }
}

export default Header
