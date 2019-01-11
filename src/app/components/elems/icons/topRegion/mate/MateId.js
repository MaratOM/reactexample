import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Tag, Icon} from 'antd'

class MateId extends Component {
  render() {
    return <Link to='/profile'>
      <Tag color='magenta'>
        <Icon type='idcard'/>
        <span className='number'>{this.props.mateId}</span>
        <span className='text'>Ваш ID</span>
      </Tag>
    </Link>
  }
}

export default MateId

