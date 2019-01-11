import React, {Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
import {Icon} from 'antd'

class Join extends Component {
  render() {
    return <div className='col-12 join'>
      <h2>
        <a name='join'>Присоединяйтесь</a>
      </h2>
      <div className='col-12 description'>
        Есть <span className='pink'>два способа</span> присоединиться к нашему сообществу<br/><span className='purple'>попробуйте сначала первый</span><br/>
      </div>
      <div className='col-6 first-method'>
        <h3><Icon type='search' theme='outlined' /></h3>
        <p>В нашей базе есть данные о более, чем 10 000 московских салонах, полученные из открытых источников. Возможно, Ваш салон уже в ней. Вы можете проверить это введя название в <a href='#find-salon'>поле формы ниже</a></p>
        <p className='body'>
          <span className='purple'>Ваш салон есть в нашей бвзе:</span>
          <br/><Icon type='check' theme='outlined' /> перейдите на <Link to='/sign/3'>страницу восстановления пароля</Link> и введите номер телефона, который указан для вашего салона в нашей базе
          <br/><Icon type='check' theme='outlined' /> Вам будет сгенерирован пароль и Вы получите его в смс на указанный номер
          <br/><Icon type='check' theme='outlined' /> <Link to='/sign/1'>войдите в систему</Link>, указав номер телефона в качестве логина и высланный Вам пароль
          <br/><span className='purple'>Вашего салона нет в нашей базе:</span>
          <br/>перейдите к способу №2
        </p>
      </div>
      <div className='col-6'>
        <h3><Icon type='solution' theme='outlined' /></h3>
        <p>Перейдите на <Link to='/sign-salon'>страницу регистрации салона</Link>, и введите сначала Ваши личные данные, а затем данные Вашего салона.</p>
      </div>
      <div className='clear-both'/>
      <div className='col-12 description mission'>
        <h3><Icon type='bulb' theme='outlined' /></h3>
        <span className='red'>ВАЖНО!</span> Добавленме Вашего салона в базу ни к чему Вас не обязывает и<br/><span className='purple'>не делает его активным</span>!<br/>Для того, чтобы пользоавтели могли с Вами работать нужно<br/><span className='purple'>включить свитч</span> в личном кабинете!<br/>
      </div>
    </div>
  }
}

export default Join
