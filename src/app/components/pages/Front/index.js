import React, {Component} from 'react'
import {connect} from 'react-redux'

import {passUrlParams} from 'app/actions/local'

import Banner from './Banner'
import Bonus from './Bonus'
import About from './About'
import Steps from './Steps'
import Tree from './Tree'
import Calculator from './Calculator'
import Beginning from './Beginning'
import Connect from './Connect'
import Salons from './Salons'
import Page from 'app/components/layouts/Page'

class FrontPage extends Component {
  render() {
    let parameters = {}
    const urlParams = this.props.location.search || ''
    const search = urlParams.substring(1)
    if(search) {
      if(!this.props.user.urlParams) {
        this.props.passUrlParams(this.props.location.search)
      }
      parameters = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }

    return <Page className='front'>
      <div className='container frontpage'>
        <div className='row content'>
          <Banner
            request={parameters.r}
            promocode={parameters.p}
            urlParams={urlParams}
          />
          <About/>
          <Steps/>
          <Tree/>
          <Calculator/>
          <Beginning/>
          <Connect/>
          <Bonus/>
          <Salons/>
        </div>
      </div>
    </Page>
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = {
  passUrlParams,
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
