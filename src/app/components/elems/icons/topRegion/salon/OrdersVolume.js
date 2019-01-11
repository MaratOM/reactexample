import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Tag, Icon} from 'antd'

class OrdersVolume extends Component {
  render() {
    return <Link to='/salon/admin/receipts/2'>
        <Tag color='magenta'>
          <Icon type='wallet'/>
          <span className='number switch'>{this.props.ordersVolume}</span>
          <span className='text'>оборот</span>
        </Tag>
      </Link>
  }
}

export default OrdersVolume
