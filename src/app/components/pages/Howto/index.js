import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon} from 'antd'

import access from 'app/access'

import AccessDenied from 'app/components/pages/AccessDenied'
import MateHowTo from './MateHowTo'
import SalonHowTo from './SalonHowTo'
import Page from 'app/components/layouts/Page'

class HowTo extends Component {
  render() {
    let howTo

    if(access.isGranted(this.props.user.roles, 'SalonHowTo')) {
      howTo = <SalonHowTo/>
    }
    else if(access.isGranted(this.props.user.roles, 'MateHowTo')) {
      howTo = <MateHowTo/>
    }
    else {
      return <AccessDenied/>
    }

    return <Page className='how-to'>
      <div className='container'>
        <div className='row content'>
          <div className='col-12'>
            <h2><Icon type='tool' /> Как это работает</h2>
            <br/>
            {howTo}
          </div>
        </div>
      </div>
    </Page>
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(HowTo)
