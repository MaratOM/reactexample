import React, {Component} from 'react'
import {Icon} from 'antd'

class About extends Component {
  render() {
    return <div className='col-12 about bonus'>
      <h2>+ 500 на счёт</h2>
      <div className='col-12 description'>
        <span>Получите</span> <span className='pink'>500 понов</span> на счёт!<br/><small><sup>*</sup>1 пон = 1 рубль</small>
      </div>
      <a href='#salons'><img className='star-icon' src='/images/star.png' alt='Получи 500 понов на счёт!'/></a>
      <div className='col-12 description'>
        <p className='purple'>Что нужно сделать, чтобы получить <span className='pink'>500 понов</span></p>
      </div>
      <div className='col-4'>
        <p><Icon type='check' theme='outlined' /> найти неподключенный салон, услугами которого вы хотели бы воспользоваться, по станции метро или прямо по названию в разделе <a href='/sign'>Салоны</a> вашего личного кабинета или на <a href='#salons'>главной странице</a></p>
      </div>
      <div className='col-4'>
        <p><Icon type='check' theme='outlined' /> позвонить по телефону, указанному в карточке салона (или зайти, если будете проходить мимо) и сказать, что хотели бы оплатить через сервис Подружки Онлайн и <span className='purple'>поставить галочку в карточке салона</span></p>
      </div>
      <div className='col-4'>
        <p><Icon type='check' theme='outlined' /> стать первым клиентом этого салона, пришедшим через сервис Подружки Онлайн. Это будет легко, потому что как только салон будет подключен, <span className='purple'>вы получите письмо</span> об этом</p>
      </div>
      <div className='clear-both'/>
      <div className='col-12 description mission'>
        <h3><Icon type='gift' /></h3>
        <span className='purple'>Всё! На вашем счету на <span className='pink'>500 понов</span> больше!</span><br/>
        <span>(вы сможете оплатить ими любые услуги в любом нашем салоне-партнёре)</span><br/>
      </div>
    </div>
  }
}

export default About
