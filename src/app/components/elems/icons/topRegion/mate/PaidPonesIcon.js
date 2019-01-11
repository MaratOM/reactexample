import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Tag, Icon, Badge} from 'antd'

class PaidPonesIcon extends Component {
  render() {
    return <Badge count={this.props.ordersPendingCount || 0}>
      <Link to={this.props.ordersPendingCount ? '/balance/4' : '/balance/1'}>
        <Tag color='magenta'>
          <Icon type='credit-card'/>
          <span className='number'>{this.props.paidPones}</span>
          <span className='text'>оплачено понами</span>
        </Tag>
      </Link>
    </Badge>
  }
}

export default PaidPonesIcon
