import React, {Component} from 'react'
import {Table, Avatar} from 'antd'

import Loading from 'app/components/elems/Loading'
import {formatNumberThousands, urlResolve} from 'app/helpers'

class Clients extends Component {
  onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter)
  }

  render() {
    if(typeof this.props.clients === 'undefined') return <Loading/>

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
        title: 'Заказы',
        dataIndex: 'orders',
        key: 'orders',
      },  {
        title: 'Сумма',
        dataIndex: 'sum',
        key: 'sum',
      },
    ]

    const data = Object.keys(this.props.clients).map((rowId, index, ids) => {
    const row = this.props.clients[rowId]
      return {
        key: index,
        num: index + 1,
        id: ids[index],
        name: <div><Avatar src={urlResolve(row.avatar)}/><br/>{row.name}</div>,
        orders: row.ordersCount,
        sum: formatNumberThousands(row.ordersSum),
      }
    })

    return <Table
        columns={columns}
        dataSource={data}
        locale={{emptyText: 'Здесь Вы будете видеть список своих клиентов с информацией и со ссылками на их личные страницы'}}
        onChange={this.onChange}
      />
  }
}

export default Clients
