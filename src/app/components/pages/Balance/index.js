import React, {Component} from 'react'
import {connect} from 'react-redux'
import R from 'ramda'
import {Tabs, Icon} from 'antd'

import {refreshUser} from 'app/actions/remote'
import access from 'app/access'

import AccessDenied from 'app/components/pages/AccessDenied'
import NotFound from 'app/components/pages/NotFound'
import Loading from 'app/components/elems/Loading'
import Receipts from './Receipts'
import Expenses from './Expenses'
import History from './History'
import Pendings from './Pendings'
import Page from 'app/components/layouts/Page'

const Tab = Tabs.TabPane

class Balance extends Component {
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

  setPendingsTab() {
    this.setState({activeTab: '4'})
  }

  render() {
    if(!access.isGranted(this.props.user.roles, 'Balance')) {
      return <AccessDenied/>
    }

    if(+this.props.match.params.tabId > 4) {
      return <NotFound/>
    }

    if(!this.props.user){
      return <Loading/>
    }

    return <Page>
      <div className='container'>
        <div className='row content'>
          <div className='col-12'>
            <h2><Icon type='wallet' /> Баланс</h2>
            <Tabs activeKey={this.state.activeTab || '1'} onTabClick={(e) => this.clickTab(e)}>
              <Tab key='1'  tab={<span><Icon type='plus-circle-o' /><span>Приход</span></span>}>
                <div className='col-12 sample-wrapper'>
                  <Receipts
                      data={this.props.balance.filter(item => item.type === 'commission')}
                      mateId={this.props.user.mateId}
                      avatar={this.props.user.avatar}
                  />
                </div>
              </Tab>
              <Tab key='2' tab={<span><Icon type='minus-circle-o' /><span>Расход</span></span>}>
                <div className='col-12 sample-wrapper'>
                  <Expenses data={this.props.balance.filter(item => item.type === 'order')}/>
                </div>
              </Tab>
              <Tab key='3' tab={<span><Icon type='copy' /><span>История</span></span>}>
                <div className='col-12 sample-wrapper'>
                  <History data={this.props.balance}/>
                </div>
              </Tab>
              <Tab key='4' tab={<span><Icon type='clock-circle-o' /><span>В ожидании</span></span>}>
                <Pendings
                    orders={this.props.user.ordersPending}
                    setPendingsTab={this.setPendingsTab.bind(this)}
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
  balance: R.reverse(state.user.balance).filter(item => item.sum !== 0)
})

const mapDispatchToProps = {
  refreshUser: refreshUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Balance)
