import React, {Component} from 'react'
import {Table} from 'antd'

import {formatNumberThousands} from 'app/helpers'

import Loading from 'app/components/elems/Loading'
import Salon from 'app/components/pages/Salon/about'

class Salons extends Component {
  onChange(pagination, filters, sorter) {
    // console.log('params', pagination, filters, sorter)
  }

  render() {
    if(typeof this.props.salons === 'undefined') return <Loading/>

    const columns = [{
        title: '№',
        dataIndex: 'num',
        key: 'num'
      }, {
        title: 'Название',
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

    const data = Object.keys(this.props.salons).map((rowId, index, ids) => {
      const row = this.props.salons[rowId]
      return {
        key: index,
        num: index + 1,
        name: <Salon avatar={row.avatar} name={row.name} sid={rowId}/>,
        orders: row.ordersCount,
        sum: formatNumberThousands(row.ordersSum),
      }
    })

    return <Table
        columns={columns}
        dataSource={data}
        locale={{emptyText: 'Здесь будут все салоны, услугами которых Вы пользовались через наш сервис.'}}
        onChange={this.onChange}
    />
  }
}

export default Salons
