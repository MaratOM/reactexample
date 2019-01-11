import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink as Link} from 'react-router-dom'
import {Timeline, Icon} from 'antd'

class MateHowTo extends Component {
  render() {
    return <Timeline>
      <Timeline.Item dot={<Icon type='user'/>}>
        <Link to='/salons/1'>Выберите салон</Link>. Как обычно, договариваетесь о процедуре, уточнив, что хотите оплатить через сервис Подружки Онлайн
      </Timeline.Item>
      <Timeline.Item dot={<Icon type='home'/>}>
        При оплате называете свой ID <span className='purple'>{this.props.user.mateId}</span> администратору салона и он выставляет Вам через сервис счёт
      </Timeline.Item>
      <Timeline.Item dot={<Icon type='user'/>}>
        Сразу же видите этот счёт в разделе <Link to='/balance/4'>Баланс > В ожидании</Link> и указываете какую сумму хотите оплатить понами
      </Timeline.Item>
      <Timeline.Item dot={<Icon type='home'/>}>
        Оставшуюся часть стоимости услуги оплачиваете в салоне удобным для Вас способом
      </Timeline.Item>
    </Timeline>
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(MateHowTo)
