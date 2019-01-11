import React, {Component} from 'react'
import {Icon} from 'antd'

class Connect extends Component {
  render() {
    return <div className='col-12 connect'>
      <h2>Подключайтесь</h2>
      <div className='col-4'>
        <h3><Icon type='check-circle' theme='outlined' /></h3>
        <h4>Простота</h4>
        <p>Очень удобный, интуитивно понятный интерфейс</p>
      </div>
      <div className='col-4'>
        <h3><Icon type='clock-circle' theme='outlined' /></h3>
        <h4>Скорость</h4>
        <p>Вы мгновенно видите все начисления от ваших подружек</p>
      </div>
      <div className='col-4'>
        <h3><Icon type='info-circle' theme='outlined' /></h3>
        <h4>Контроль</h4>
        <p>В личном кабинете вы всегда можете проверить историю всех операции</p>
      </div>
      <div className='clear-both'/>
    </div>
  }
}

export default Connect
