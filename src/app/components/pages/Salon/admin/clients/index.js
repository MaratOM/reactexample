import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon} from 'antd'

import {refreshUser} from 'app/actions/remote'
import access from 'app/access'

import AccessDenied from 'app/components/pages/AccessDenied'
import Loading from 'app/components/elems/Loading'
import Clients from './Clients'
import Page from 'app/components/layouts/Page'

class SalonAdminClients extends Component {
  componentDidMount() {
    this.props.refreshUser(this.props.user._id)
  }
  
  render() {
    if(!access.isGranted(this.props.user.roles, 'SalonAdminClients')) {
      return <AccessDenied/>
    }

    if(!this.props.clients){
      return <Loading/>
    }

    return <Page>
      <div className='container'>
        <div className='row content'>
          <div className='col-12 sample-wrapper'>
            <h2><Icon type='team' /> Клиенты</h2>
            <Clients
              clients={this.props.clients}
            />
          </div>
        </div>
      </div>
    </Page>
  }
}

const mapStateToProps = state => ({
  clients: state.salon.clients,
  user: state.user,
})

const mapDispatchToProps = {
  refreshUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SalonAdminClients)
