import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Tag, Icon, Badge} from 'antd'

class OrdersCount extends Component {
  render() {
    const link = this.props.ordersPendingCount ? '/salon/admin/receipts/3' : '/salon/admin/receipts/2'

    return <Badge count={this.props.ordersPendingCount || 0}>
      <Link to={link}>
        <Tag color='magenta'>
          <Icon type='bars'/>
          <span className='number'>{this.props.ordersCount}</span>
          <span className='text'>заказов</span>
        </Tag>
      </Link>
    </Badge>
  }
}

export default OrdersCount
