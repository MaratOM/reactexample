import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Tag, Icon} from 'antd'

class MatesCount extends Component {
  render() {
    return <Link to='/mates'>
      <Tag color='magenta'>
        <Icon type='team'/>
        <span className='number'>{this.props.matesCount}</span>
        <span className='text'>подружек</span>
      </Tag>
    </Link>
  }
}

export default MatesCount
