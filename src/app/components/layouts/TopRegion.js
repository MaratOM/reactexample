import React, {Component} from 'react'
import {connect} from 'react-redux'
import {change} from 'redux-form'
import {Alert, Icon} from 'antd'

import {activateSalon} from 'app/actions/remote'

import LogoIcon from 'app/components/elems/icons/topRegion/all/LogoIcon'
import ProfileIcon from 'app/components/elems/icons/topRegion/all/ProfileIcon'

import MaitId from 'app/components/elems/icons/topRegion/mate/MateId'
import MatesIcon from 'app/components/elems/icons/topRegion/mate/MatesIcon'
import PaidPonesIcon from 'app/components/elems/icons/topRegion/mate/PaidPonesIcon'
import BalanceIcon from 'app/components/elems/icons/topRegion/mate/BalanceIcon'

import OrdersIcon from 'app/components/elems/icons/topRegion/salon/OrdersIcon'
import ClientsIcon from 'app/components/elems/icons/topRegion/salon/ClientsIcon'
import OrdersVolume from 'app/components/elems/icons/topRegion/salon/OrdersVolume'
import SwitchIcon from 'app/components/elems/icons/topRegion/salon/SwitchIcon'

const ComplexText = props => {
  return <div>{props.text} <Icon type='smile-o' /></div>
}

class TopRegion extends Component {
  componentWillReceiveProps(nextProps) {
    this.props.changeSalonActiveFieldValue(nextProps.salon.active)
  }

  render() {
    let topRegionData
    const alert = false

    switch(this.props.user.type) {
      case 'mate':
        topRegionData =
          <div>
            <div className='col-md-12 logo-region'>
              <LogoIcon/>
            </div>
            <div className='col-md-12'>
              {alert && <Alert type='error' description={<ComplexText text='Спасибо, что являетесь нашим клиентом!
                Мы дорабатываем функционал и пополняем базу клиентов и салонов.
                Мы будем держать Вас в курсе.
                Очень скоро вы сможете оплатить услуги нашей валютой - понами!'/>}
              />}
            </div>
            <div className='col-md-12 avatar-region'>
              <ProfileIcon
                avatar={this.props.user.avatar}
                name={`${this.props.user.name} ${this.props.user.surname}`}
                type={this.props.user.type}
              />
            </div>
            <div className='col-md-12 squares-region'>
              <div className='square'>
                <MaitId mateId={this.props.user.mateId}/>
              </div>
              <div className='square'>
                <MatesIcon matesCount={this.props.user.data.matesCount}/>
              </div>
              <div className='square'>
                <BalanceIcon balance={this.props.user.data.balance}/>
              </div>
              <div className='square'>
                <PaidPonesIcon
                  paidPones={this.props.user.data.paidPones}
                  ordersPendingCount={Object.keys(this.props.user.ordersPending).length}
                />
              </div>
              <div className='clear-both'/>
            </div>
          </div>
        break
      case 'salon':
        if(this.props.salon && Object.keys(this.props.salon).length) {
          topRegionData =
            <div>
              <div className='col-md-12 logo-region'>
                <LogoIcon/>
              </div>
              <div className='col-md-12'>
                {alert && <Alert type='error' description={<ComplexText text='Спасибо, что являетесь нашим клиентом!
                  Мы дорабатываем функционал и пополняем базу клиентов и салонов.
                  Мы будем держать Вас в курсе.
                  Очень скоро вы сможете врубить переключатель!'/>}
                />}
              </div>
              <div className='col-md-12 avatar-region'>
                <ProfileIcon
                  avatar={this.props.user.avatar}
                  name={this.props.salon.name}
                  type={this.props.user.type}
                />
              </div>
              <div className='col-md-12 squares-region'>
                <div className='square'>
                  <OrdersIcon
                    ordersCount={this.props.salon.data.ordersCount}
                    ordersPendingCount={Object.keys(this.props.salon.ordersPending).length}
                  />
                </div>
                <div className='square'>
                  <ClientsIcon
                    clientsCount={this.props.salon.data.clientsCount}
                  />
                </div>
                <div className='square'>
                  <OrdersVolume
                    ordersVolume={this.props.salon.data.ordersVolume}
                  />
                </div>
                <div className='square'>
                  <SwitchIcon
                    _id={this.props.salon._id}
                    checked={this.props.salon.active}
                    activate={this.props.activateSalon}
                  />
                </div>
                <div className='clear-both'/>
              </div>
            </div>
        }
        else {
          // when user didn't add slao
          topRegionData =
            <div>
              <div className='col-md-12 logo-region'>
                <LogoIcon/>
              </div>
              <div className='col-md-12'>
                {alert && <Alert type='error' description={<ComplexText text='Спасибо, что являетесь нашим клиентом!
                  Мы дорабатываем функционал и пополняем базу клиентов и салонов.
                  Мы будем держать Вас в курсе.
                  Очень скоро вы сможете врубить переключатель!'/>}
                />}
              </div>
              <div className='col-md-12 avatar-region'>
                <ProfileIcon
                    avatar={this.props.user.avatar}
                    name={this.props.salon.name}
                />
              </div>
            </div>
        }
        break
      default:
        topRegionData =
          <div className='col-md-12 logo-region'>
            <LogoIcon/>
          </div>
        break
    }

    return <div className='container'>
      <div className='row top-region'>
        {topRegionData}
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  user: state.user,
  salon: state.salon,
})

const mapDispatchToProps = {
  changeSalonActiveFieldValue: value => dispatch => {
    dispatch(change('salon', 'active', value))
  },
  activateSalon,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopRegion)
