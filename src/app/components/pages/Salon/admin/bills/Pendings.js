import React, {Component} from 'react'
import {Table, Icon, Button} from 'antd'

import Loading from 'app/components/elems/Loading'
import {DateWithTime} from 'app/helpers'

class Pendings extends Component {
  render() {
    if(typeof this.props.orders === 'undefined') return <Loading/>

    const columns = [{
      title: '№',
      dataIndex: 'num',
      key: 'num',
      // fixed: 'left',
    }, {
      title: '№ заказа',
      dataIndex: 'oid',
      key: 'oid',
      // fixed: 'left',
    },  {
      title: 'Подробнее',
      dataIndex: 'more',
      key: 'more',
    }, {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      }, {
        title: 'Сумма',
        dataIndex: 'sum',
        key: 'sum',
      },  {
      title: 'Срок',
      dataIndex: 'dueDate',
      key: 'dueDate',
      }, ]

    const data = Object.keys(this.props.orders).map((rowId, index) => {
      const row = this.props.orders[rowId]
      const date = new Date(row.created)
      const dueDate = new Date(row.dueDate)

      return {
        key: index,
        num: index + 1,
        oid: row.oid,
        more: <Button type='primary'><Icon type='profile' /></Button>,
        date: <DateWithTime date={date}/>,
        sum: row.sum,
        dueDate: <DateWithTime date={dueDate}/>,
      }
  })

    return <Table
        columns={columns}
        dataSource={data}
        locale={{emptyText: 'Здесь Вы будете видеть неоплаченные суммы взаиморасчётов между Вашим салоном и сервисом Подружки.Онлайн по каждой услуге.'}}
        onChange={this.onChange}
      />
  }
}

export default Pendings
