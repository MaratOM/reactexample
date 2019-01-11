import React, {Component} from 'react'
import {Table} from 'antd'

import Loading from 'app/components/elems/Loading'
import Salon from 'app/components/pages/Salon/about'
import {DateWithTime} from 'app/helpers'

class Expenses extends Component {
  render() {
    if(typeof this.props.data === 'undefined') return <Loading/>

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
      dataIndex: 'sum',
      key: 'sum',
    },  {
      title: 'Сумма',
      dataIndex: 'sumOrder',
      key: 'sumOrder',
    }, ]

    const data = this.props.data.map((row, index) => {
      const date = row.created ? new Date(row.created) : new Date()

      return {
        key: index,
        num: index + 1,
        name: <Salon avatar={row.salonAvatar} name={row.salonName} sid={row.sid}/>,
        service: row.services ? row.services.join(', ') : '',
        date: <DateWithTime date={date}/>,
        sum: row.sum,
        sumOrder: row.sumOrder,
      }
    })

    return <Table
        columns={columns}
        dataSource={data}
        locale={{emptyText: 'Здесь Вы будете видеть все услуги, которыми воспользовались Вы. В столбце "Стоимость" - полная цена услуги, а в столбце "Сумма" - часть, которая была оплачена Понами.'}}
        onChange={this.onChange}
    />
  }
}

export default Expenses
