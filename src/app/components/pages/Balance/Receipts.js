import React, {Component} from 'react'
import {Table, Avatar} from 'antd'

import Loading from 'app/components/elems/Loading'
import {urlResolve, DateWithTime} from 'app/helpers'

class Receipts extends Component {
  render() {
    if(typeof this.props.data === 'undefined') return <Loading/>

    const columns = [{
        title: '№',
        dataIndex: 'num',
        key: 'num'
      }, {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        // sorter: (a, b) => a.name.toString().localeCompare(b.name.toString()) > 0,
        // sorter: (a, b) => a.name.length - b.name.length,
      }, {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
      },  {
        title: 'Сумма',
        dataIndex: 'sum',
        key: 'sum',
      },
    ]

    const data = this.props.data.map((row, index) => {
      const name = this.props.mateId === row.customerId
        ? <div><Avatar src={urlResolve(row.avatar)}/><br/>Я</div>
        : <div><Avatar src={urlResolve(row.customerAvatar)}/><br/>{row.customerName}</div>
      const date = row.created ? new Date(row.created) : new Date()

      return {
        key: index,
        num: index + 1,
        id: row.customerId,
        name: name,
        date: <DateWithTime date={date}/>,
        sum: row.sum,
      }
    })

    return <Table
        columns={columns}
        dataSource={data}
        locale={{emptyText: 'Здесь Вы будете видеть все зачисления на Ваш счёт. Суммы в нашей валюте - Понах (1 Пон = 1 Рубль) зачисляются со всех покупок Ваших Подружек.'}}
        onChange={this.onChange}
    />
  }
}

export default Receipts
