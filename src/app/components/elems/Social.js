import React, {Component} from 'react'
import {Icon} from 'antd'

class Social extends Component {
  render() {
    return <div className='col-12 text-center'>
      <p className='social'>
        <a href='https://www.instagram.com/podruzhki.online/'><Icon type='instagram' /></a>
        <a href='https://www.facebook.com/podruzhki.online/'><Icon type='facebook' /></a>
      </p>
    </div>
  }
}

export default Social
