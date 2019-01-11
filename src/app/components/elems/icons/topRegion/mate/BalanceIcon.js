import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Tag, Icon} from 'antd'

class BalanceIcon extends Component {
  render() {
    return <Link to='/balance/3'>
      <Tag color='magenta'>
        <Icon type='wallet'/>
        <span className='number'>{this.props.balance}</span>
        <span className='text'>на счету</span>
      </Tag>
    </Link>
  }
}

export default BalanceIcon
