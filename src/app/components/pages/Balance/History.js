import React, {Component} from 'react'
import {Table, Button, Icon} from 'antd'

import {DateWithTime} from 'app/helpers'
import Loading from 'app/components/elems/Loading'

class BalanceHistory extends Component {
  render() {
    if(typeof this.props.data === 'undefined') return <Loading/>

    const columns = [{
        title: '№',
        dataIndex: 'num',
        key: 'num'
      }, {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
      },  {
        title: 'Подробнее',
        dataIndex: 'more',
        key: 'more',
      },  {
        title: 'Сумма',
        dataIndex: 'sum',
        key: 'sum',
      },
    ]

    const data = this.props.data.map((row, index) => {
      const date = row.created ? new Date(row.created) : new Date()

      return {
        key: index,
        num: index + 1,
        date: <DateWithTime date={date}/>,
        more: <Button type='primary'><Icon type='profile' /></Button>,
        sum: (row.type === 'expense' ? '-' : '') + row.sum,
      }
  })

    return <Table
        columns={columns}
        dataSource={data}
        locale={{emptyText: 'В этой таблице отражаются все движения по Вашему счету. Суммы Понов, которыми были оплачены Ваши услуги и суммы полученные от покупок Ваших Подружек.'}}
        onChange={this.onChange}
    />
  }
}

export default BalanceHistory
