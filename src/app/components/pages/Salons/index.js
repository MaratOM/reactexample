import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon, Tabs} from 'antd'

import {refreshUser} from 'app/actions/remote'
import access from 'app/access'

import AccessDenied from 'app/components/pages/AccessDenied'
import Loading from 'app/components/elems/Loading'
import MySalons from './MySalons'
import FindSalons from 'app/components/elems/FindSalons'
import Page from 'app/components/layouts/Page'

const Tab = Tabs.TabPane

class Salons extends Component {
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

  componentDidMount() {
    this.props.refreshUser(this.props.user._id)
  }

  clickTab(tabKey) {
    this.setState({activeTab: tabKey})
  }
  
  render() {
    if(!access.isGranted(this.props.user.roles, 'Salons')) {
      return <AccessDenied/>
    }

    if(!this.props.salons){
      return <Loading/>
    }

    return <Page>
      <div className='container'>
        <div className='row content'>
          <div className='col-12 salons'>
            <h2><Icon type='shop' /> Салоны</h2>
            <Tabs activeKey={this.state.activeTab || '1'} onTabClick={(e) => this.clickTab(e)}>
              <Tab key='1'  tab={<span><Icon type='search' theme='outlined' /><span>Салоны</span></span>}>
                <FindSalons/>
              </Tab>
              <Tab key='2'  tab={<span><Icon type='user' /><span>Мои салоны</span></span>}>
                <MySalons
                  salons={this.props.salons}
                />
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
  salons: state.user.salons || {},
})

const mapDispatchToProps = {
  refreshUser: refreshUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Salons)
