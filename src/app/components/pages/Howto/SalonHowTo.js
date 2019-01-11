import React, {Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
import {Timeline, Icon} from 'antd'

class SalonHowTo extends Component {
  render() {
    return <Timeline>
      <Timeline.Item dot={<Icon type='user'/>}>
        Клиент выбирает Ваш салон в списке партнерских салонов и договаривается об услуге
      </Timeline.Item>
      <Timeline.Item dot={<Icon type='home'/>}>
        После оказания услуги Вы выставляете ему счёт в разделе <Link to='/salon/admin/receipts/1'>Счета > Выставить счёт</Link>, введя его ID
      </Timeline.Item>
      <Timeline.Item dot={<Icon type='user'/>}>
        В своём интерфейсе сервиса клиент отмечает какую часть суммы он хочет оплатить накоплеными баллами (понами 1 пон = 1 рубль), какую рублями
      </Timeline.Item>
      <Timeline.Item dot={<Icon type='home'/>}>
        Это тут же отражается в Вашем интерфейсе в разделе <Link to='/salon/admin/receipts/3'>Счета > В ожидании</Link>, Вы акцептуете платеж и принимате к оплате стоимость за вычетом суммы понов
      </Timeline.Item>
      <Timeline.Item dot={<Icon type='team'/>}>
        Разница между полной стоимостью услуги и суммой оплаченной в салоне клиентом будет возвращена Вам сервисом Подружки.Онлайн. Все взаиморасчёты между сервисом Подружки.Онлайн и Вашим салоном Вы в любой момент можете увидеть в разделе <Link to='/salon/admin/bills'>Расчёты</Link>
      </Timeline.Item>
      <Timeline.Item dot={<Icon type='team'/>}>
        С каждой прошедшей через сервис операции Вы переводите сервису сумму по процентной ставке 22 процента от стоимости услуги. БОльшая часть которой идет на начисление бонусов - понов. Бонусы в процентах от полной суммы начисляются 5 уровням подружек, в чьей структуре находится клиент. В дальнейшем они возвращаются к Вам в качестве оплаты на новые услуги.
      </Timeline.Item>
    </Timeline>
  }
}

export default SalonHowTo
