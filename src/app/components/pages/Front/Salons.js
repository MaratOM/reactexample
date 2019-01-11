import React, {Component} from 'react'

import FindSalons from 'app/components/elems/FindSalons'

class Salons extends Component {
  render() {
    return <div className='col-12 salons'>
      <h2>
        <a name='salons'>Салоны</a>
      </h2>
      <FindSalons/>
    </div>
  }
}

export default Salons
