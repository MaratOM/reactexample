import React, {Component} from 'react'

import Gallery from 'app/components/elems/Gallery'

class Find extends Component {
  render() {
    return <div className='col-12 join find-salons'>
      <h2>
        <a name='find-salon'>Найди себя</a>
      </h2>
      <div className='col-12 description'>
        Введите <span className='pink'>название вашего салона</span>, чтобы определить есть ли данные о нём в нашей базе<br/><br/>
      </div>
      <div className='find'>
        <Gallery type='byName'/>
      </div>
    </div>
  }
}

export default Find
