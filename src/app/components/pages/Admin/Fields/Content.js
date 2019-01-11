import React, {Component} from 'react'
import {Table} from 'antd'

import Loading from 'app/components/elems/Loading'
import ItemForm from './ItemForm'

class EditFieldsContent extends Component {
  render() {
    if(typeof this.props.data === 'undefined') return <Loading/>

    const columns = [{
      title: '№',
      dataIndex: 'num',
      key: 'num',
    }, {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
    }, ]

    const data = this.props.data.map((item, index) => {
      return {
        key: index,
        num: index + 1,
        data: <ItemForm
          model={this.props.filters.model}
          fieldName={this.props.filters.field}
          fieldData={item[this.props.filters.field]}
          _id={item._id}
          fetchModelFieldsDataSave={this.props.fetchModelFieldsDataSave}
        />,
      }
    })

    return <Table
      columns={columns}
      dataSource={data}
      locale={{emptyText: 'Данные для редактирования.'}}
      onChange={this.onChange}
      pagination={{defaultPageSize: 50, position: 'both'}}
    />
  }
}

export default EditFieldsContent
