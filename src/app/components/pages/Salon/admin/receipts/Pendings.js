import React, {Component} from 'react'
import {Table, Avatar, Icon, Button} from 'antd'

import Loading from 'app/components/elems/Loading'
import {urlResolve, DateWithTime} from 'app/helpers'

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
    }, {
      title: 'Клиент',
      dataIndex: 'name',
      key: 'name',
      // sorter: (a, b) => a.name.toString().localeCompare(b.name.toString()) > 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      // fixed: 'left',
    }, {
      title: 'Услуга',
      dataIndex: 'service',
      key: 'services',
      width: '100px',
    }, {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      }, {
        title: 'Всего',
        dataIndex: 'sumOrder',
        key: 'sumOrder',
      },  {
        title: 'Клиент',
        dataIndex: 'sumRub',
        key: 'sum_rub',
      },  {
        title: 'П.О',
        dataIndex: 'sumPon',
        key: 'sum_pon',
      }, {
        title: 'Оплата',
        dataIndex: 'paid',
        key: 'paid',
        // fixed: 'right',
      }, ]

    const data = Object.keys(this.props.orders).map((rowId, index) => {
      const row = this.props.orders[rowId]
      const date = new Date(row.created)

      return {
        key: index,
        num: index + 1,
        oid: row.oid,
        name: <div><Avatar src={urlResolve(row.mateAvatar)}/><br/>{row.mateId} {row.mateName}</div>,
        service: row.services ? row.services.join(', ') : '',
        date: <DateWithTime date={date}/>,
        sumOrder: row.sumOrder,
        sumRub: row.sumRub,
        sumPon: row.status === 'created' ? <Icon type='loading' /> : row.sumPon,
        paid: row.status !== 'created'
          ? <Button type='primary' icon='wallet' onClick={() => this.props.completeSalonReceipt(row.oid)}/>
          : <Button type='primary' icon='delete' onClick={() => this.props.deleteOrder(row.oid)}/>,
      }
  })

    return <Table
        columns={columns}
        dataSource={data}
        locale={{emptyText: 'Здесь Вы будете видеть список активных заказов с информацией и возможностью подтвержать или удалять их.'}}
        onChange={this.onChange}
      />
  }
}

export default Pendings
