import React, {Component} from 'react'

import Why from './Why'
import Banner from './Banner'
import Join from './Join'
import Find from './Find'
import Page from 'app/components/layouts/Page'

class FrontPageSalons extends Component {
  render() {
    return <Page className='front'>
      <div className='container frontpage'>
        <div className='row content'>
          <Banner/>
          <Why/>
          <Join/>
          <Find/>
        </div>
      </div>
    </Page>
  }
}

export default FrontPageSalons
