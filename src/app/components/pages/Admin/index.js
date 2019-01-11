import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Tabs, Icon} from 'antd'

import access from 'app/access'

import AccessDenied from 'app/components/pages/AccessDenied'
import NotFound from 'app/components/pages/NotFound'
import Page from 'app/components/layouts/Page'
import Fields from './Fields'

const Tab = Tabs.TabPane

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
    }
  }

  componentWillMount() {
    this.setState({activeTab: this.props.match.params.tabId})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({activeTab: nextProps.match.params.tabId})
  }

  clickTab(tabKey) {
    this.setState({activeTab: tabKey})
  }

  render() {
    if(!access.isGranted(this.props.user.roles, 'Admin')) {
      return <AccessDenied/>
    }

    if(+this.props.match.params.tabId > 3) {
      return <NotFound/>
    }

    return <Page>
      <div className='container'>
        <div className='row content admin'>
          <div className='col-12 sample-wrapper'>
            <h2><Icon type='bank' /> Admin panel</h2>
            <Tabs  activeKey={this.state.activeTab || '1'} onTabClick={(e) => this.clickTab(e)}>
              <Tab key='1' tab={<span><Icon type='form' /><span>Fields edit</span></span>}>
                <Fields/>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Page>
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
