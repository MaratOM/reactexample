import React, {Component} from 'react'
import {Icon} from 'antd'

class Copyright extends Component {
  render() {
    return <div className='col-12 text-center'>
      <p className='copyright'><a href='mailto:support@podruzhki.online'>support@podruzhki.online</a></p>
      <p className='copyright'><Icon type='copyright' /> Copyright 2017-{new Date().getFullYear()}</p>
    </div>
  }
}

export default Copyright
