import React, {Component} from 'react'

import BottomMenu from 'app/components/elems/menu/BottomMenu'
import Copyright from 'app/components/elems/Copyright'
import Social from 'app/components/elems/Social'

class Footer extends Component {
  render() {
    return <div className='container'>
      <div className='row footer'>
        <BottomMenu/>
        <Social/>
        <Copyright/>
      </div>
    </div>
  }
}

export default Footer
