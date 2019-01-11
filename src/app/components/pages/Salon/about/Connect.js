import React, {Component} from 'react'
import {Checkbox, Icon, Timeline, message} from 'antd'

class Connect extends Component {
  onChange = async () => {
    if(!this.props.user.roles.includes('MATE')) {
      message.warning('Пожалуйста, войдите или зарегистрируйтесь, чтобы подключить салон!')
      return
    }

    const result = await this.props.userConnectSalon(this.props.sid)

    if(result.status === 200) {
      message.success('Спасибо! Ваша заявка зафиксирована!')
    }
    else {
      message.error('Подключать салоны можно не чаще, чем раз в 2 минуты!')
    }
  }

  render() {
    const checked = !this.props.user.type || this.props.user.type !== 'mate' ? false : !!this.props.user.connectSalons[this.props.sid]

    return <div>
      <h5>Что нужно сделать, чтобы получить на счёт 500 понов (1 пон = 1 рубль)</h5>
      <Timeline>
        <Timeline.Item dot={<Icon type='phone'/>}>
          <Icon type='check'/>Позвонить в салон (или зайти, если будете проходить мимо) и сказать, что хотите оплатить через сервис ПОДРУЖКИ.ОНЛАЙН<br/>
          Всё!<br/>
          Сделано? Поставьте галочку здесь <Checkbox onChange={this.onChange} checked={checked} disabled={checked}/><br/>
          *<small className='purple'>как только салон будет подключён Вам придёт оповещение</small>
        </Timeline.Item>
        <Timeline.Item dot={<Icon type='user'/>}>
          Первая услуга в этом салоне должна быть ВАША. Постарайтесь, чтобы Вас никто не опередил! <Icon type='smile-o'/>
        </Timeline.Item>
        <Timeline.Item dot={<Icon type='gift'/>}>
          Сразу после оплаты этой услуги на Вашем счету появятся <span className='pones'>500</span> понов!
        </Timeline.Item>
      </Timeline>
    </div>
  }
}

export default Connect
