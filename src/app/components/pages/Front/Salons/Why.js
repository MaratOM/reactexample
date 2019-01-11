import React, {Component} from 'react'
import {Icon} from 'antd'

class Why extends Component {
  render() {
    return <div className='col-12 about'>
      <h2>Почему мы</h2>
      <div className='col-12 description'>
        <span className='pink'>подружки.онлайн</span> - это очень гибкая<br/>
        <span className='purple'>облачная система</span><br/>
      </div>
      <h3><Icon type='cloud' theme='outlined' /></h3>
      <div className='col-4'>
        <p><Icon type='check' theme='outlined' /> у вас есть время, когда клиентов меньше всего? Вы можете подключать систему только в это время и отключаться в другое</p>
      </div>
      <div className='col-4'>
        <p><Icon type='check' theme='outlined' /> каждая оказанная Вами услуга влечет за собой, как минимум, еще пять, так как за нее начисляются проценты пяти пользователям</p>
      </div>
      <div className='col-4'>
        <p><Icon type='check' theme='outlined' /> все начисления могут быть потрачены только на новые услуги, так что ждите новых клиентов :)</p>
      </div>
      <div className='clear-both'/>
      <div className='col-12 description mission'>
        <h3><Icon type='poweroff' theme='outlined' /></h3>
        Подключайтесь к системе и отключайтесь от нее<br/><span className='purple'>в один клик</span><br/>
      </div>
    </div>
  }
}

export default Why
