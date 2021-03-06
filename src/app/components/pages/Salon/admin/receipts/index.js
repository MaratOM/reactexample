import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Tabs, Icon, message} from 'antd'

import {completeSalonReceipt, deleteOrder, refreshUser} from 'app/actions/remote'
import access from 'app/access'

import AccessDenied from 'app/components/pages/AccessDenied'
import NotFound from 'app/components/pages/NotFound'
import ToBill from './ToBill'
import Receipts from './Receipts'
import Pendings from './Pendings'
import Page from 'app/components/layouts/Page'

const Tab = Tabs.TabPane

class SalonAdminReceipts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
    }
    this.completeSalonReceipt = this.completeSalonReceipt.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
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

  async completeSalonReceipt(oid) {
    const result = await this.props.completeSalonReceipt(oid)
    result && result.status && result.status === 200
      ? message.success(`Спасибо за подтверждение! Заказ перемещён в раздел Счета.`)
      : message.error(`Произошла ошибка! Пожалуйста, повторите попытку позже.`)
  }

  async deleteOrder(oid) {
    await this.props.deleteOrder(oid)
    message.success(`Заказ удалён.`)
  }

  clickTab(tabKey) {
    this.setState({activeTab: tabKey})
  }

  render() {
    if(!access.isGranted(this.props.user.roles, 'SalonAdminReceipts')) {
      return <AccessDenied/>
    }

    if(+this.props.match.params.tabId > 3) {
      return <NotFound/>
    }

    return <Page>
      <div className='container'>
        <div className='row content'>
          <div className='col-12 sample-wrapper'>
            <h2><Icon type='solution' /> Счета</h2>
            <Tabs  activeKey={this.state.activeTab || '1'} onTabClick={(e) => this.clickTab(e)}>
              <Tab key='1' tab={<span><Icon type='form' /><span>Выставить счёт</span></span>}>
                <p className='no-data-text'>Выставьте счёт клиенту <br/>Он мгновенно его увидит и сможет подтвердить</p>
                <ToBill/>
              </Tab>
              <Tab key='2' tab={<span><Icon type='copy' /><span>Оплаченные</span></span>}>
                <Receipts
                  orders={this.props.orders}
                />
              </Tab>
              <Tab key='3' tab={<span><Icon type='clock-circle-o' /><span>В ожидании</span></span>}>
                <Pendings
                  orders={this.props.ordersPending}
                  completeSalonReceipt={this.completeSalonReceipt}
                  deleteOrder={this.deleteOrder}
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
  orders: state.salon.orders,
  ordersPending: state.salon.ordersPending,
})

const mapDispatchToProps = {
  completeSalonReceipt,
  deleteOrder,
  refreshUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SalonAdminReceipts)
