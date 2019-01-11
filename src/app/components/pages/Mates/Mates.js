import React, {Component} from 'react'
import {Table, Avatar} from 'antd'
import {urlResolve, DateWithTime} from 'app/helpers'

import Loading from 'app/components/elems/Loading'

class MatesTable extends Component {
  onChange(pagination, filters, sorter) {
    // console.log('params', pagination, filters, sorter)
  }

  render() {
    if(typeof this.props.mates === 'undefined') return <Loading/>

    const columns = [{
        title: '№',
        dataIndex: 'num',
        key: 'num'
      }, {
        title: 'ID',
        dataIndex: 'mateId',
        key: 'mateId',
        // sorter: (a, b) => a.name.toString().localeCompare(b.name.toString()) > 0,
        // sorter: (a, b) => a.name.length - b.name.length,
      }, {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
      },  {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
      },
    ]

    const data = this.props.mates.map((row, index) => {
      const date = new Date(row.created)

      return {
        key: index,
        num: index + 1,
        mateId: row.mateId,
        name: <div><Avatar src={urlResolve(row.avatar)}/><br/>{row.name} {row.surname}</div>,
        date: <DateWithTime date={date}/>,
      }
    })

    return <Table
        columns={columns}
        dataSource={data}
        locale={{emptyText: 'Здесь Вы будете видеть Подружек, с которых Вы будете получать доход. Это все Подружки, которых прогласили Вы, и все Подружки Ваших Подружек на 5 уровней'}}
        onChange={this.onChange}
    />
  }
}

export default MatesTable
