import React, {Component} from 'react'
import {Table, Icon} from 'antd'

import Loading from 'app/components/elems/Loading'
import Salon from 'app/components/pages/Salon/about'
import Pay from './Pay'
import {DateWithTime} from 'app/helpers'

class Pendings extends Component {
  render() {
    if(typeof this.props.orders === 'undefined') return <Loading/>

    const columns = [{
      title: '№',
      dataIndex: 'num',
      key: 'num'
    }, {
      title: 'Салон',
      dataIndex: 'name',
      key: 'name',
      // sorter: (a, b) => a.name.toString().localeCompare(b.name.toString()) > 0,
      // sorter: (a, b) => a.name.length - b.name.length,
    }, {
      title: 'Услуга',
      dataIndex: 'service',
      key: 'service',
    }, {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },  {
      title: 'Поны',
      dataIndex: 'sumPon',
      key: 'sumPon',
    },  {
      title: 'Рубли',
      dataIndex: 'sumRub',
      key: 'sumRub',
    },  {
      title: 'Сумма',
      dataIndex: 'sumOrder',
      key: 'sumOrder',
    },  {
      title: 'Салон',
      dataIndex: 'salonConfirm',
      key: 'salonConfirm',
    }, ]

    const data = Object.keys(this.props.orders).map((rowId, index) => {
      const row = this.props.orders[rowId]
      const date = new Date(row.created)

      return {
        key: index,
        num: index + 1,
        name: <Salon avatar={row.salonAvatar} name={row.salonName} sid={row.sid}/>,
        service: row.services.join(', '),
        date: <DateWithTime date={date}/>,
        sumPon: row.status !== 'created' ? row.sumPon : <Pay order={row} setPendingsTab={this.props.setPendingsTab}/>,
        sumRub: row.sumRub,
        sumOrder: row.sumOrder,
        salonConfirm: row.status !== 'created' ? <Icon type='loading' /> : <Icon type='retweet' />,
      }
  })

  return <Table
      columns={columns}
      dataSource={data}
      locale={{emptyText: 'Здесь Вы будете видеть список активных заказов и сможете указать какую сумму оплатить Понами. Салон сразу же увидит эту информацию и Вам нужно будет оплатить рублями лишь остаток.'}}
      onChange={this.onChange}
    />
  }
}

export default Pendings
