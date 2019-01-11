import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Tag, Icon, Badge} from 'antd'

class PayIcon extends Component {
  render() {
    return <Badge count={this.props.ordersPendingCount || 0}>
      <Link to='/balance/4'>
        <Tag color='magenta'>
          <Icon type='credit-card'/>
          <span className='text'>в ожидании</span>
        </Tag>
      </Link>
    </Badge>
  }
}

export default PayIcon
