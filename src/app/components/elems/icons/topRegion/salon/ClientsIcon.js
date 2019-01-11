import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Tag, Icon} from 'antd'

class ClientsCount extends Component {
  render() {
    return <Link to='/salon/admin/clients'>
        <Tag color='magenta'>
          <Icon type='team'/>
          <span className='number'>{this.props.clientsCount}</span>
          <span className='text'>клиентов</span>
        </Tag>
      </Link>
  }
}

export default ClientsCount
