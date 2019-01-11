import React, {Component} from 'react'
import {Spin} from 'antd'

class Loading extends Component {
  render() {
    return <center><Spin size='large' /></center>
  }
}

export default Loading
