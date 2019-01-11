import React, {Component} from 'react'
import {Icon} from 'antd'

class About extends Component {
  render() {
    return <div className='col-12 about' id='about'>
      <h2>О нас</h2>
      <div className='col-12 description'>
        <span className='pink'>подружки.онлайн</span> - это <span className='purple'>сообщество</span>,<br/>состоящее из клиентов салонов красоты и<br/>
        <span className='purple'>облачный сервис</span>, который<br/>
      </div>
      <h3><Icon type='cloud' theme='outlined' /></h3>
      <div className='col-4'>
        <p><Icon type='check' theme='outlined' /> отслеживает и фиксирует связи между членами сообщества</p>
      </div>
      <div className='col-4'>
        <p><Icon type='check' theme='outlined' /> начисляет бонусные баллы за покупки всех пользователей, приглашенных клиентом</p>
      </div>
      <div className='col-4'>
        <p><Icon type='check' theme='outlined' /> позволяет расплачиваться заработанными баллами в салонах-партнёрах</p>
      </div>
      <div className='clear-both'/>
      <div className='col-12 description mission'>
        <h3><Icon type='rocket' theme='outlined' /></h3>
        <span className='purple'>Наша миссия</span><br/>сделать услуги салонов красоты более доступными<br/>
      </div>
    </div>
  }
}

export default About
