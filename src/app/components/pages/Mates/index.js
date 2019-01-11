import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon} from 'antd'

import {refreshUser} from 'app/actions/remote'
import access from 'app/access'

import AccessDenied from 'app/components/pages/AccessDenied'
import Loading from 'app/components/elems/Loading'
import MatesTable from './Mates'
import Page from 'app/components/layouts/Page'

class Mates extends Component {
  componentDidMount() {
    this.props.refreshUser(this.props.user._id)
  }

  render() {
    if(!access.isGranted(this.props.user.roles, 'Salons')) {
      return <AccessDenied/>
    }

    if(!this.props.mates){
      return <Loading/>
    }

    return <Page>
      <div className='container'>
        <div className='row content'>
          <div className='col-12 sample-wrapper'>
            <h2><Icon type='team' /> Подружки</h2>
            <MatesTable
              mates={this.props.mates}
            />
          </div>
        </div>
      </div>
    </Page>
  }
}

const mapStateToProps = state => ({
  user: state.user,
  mates: state.user.mates,
})

const mapDispatchToProps = {
  refreshUser: refreshUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Mates)
