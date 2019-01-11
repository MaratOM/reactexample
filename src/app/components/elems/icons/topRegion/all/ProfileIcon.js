import React, {Component} from 'react'
import { HashLink as Link } from 'react-router-hash-link'
// import $ from 'jquery'
import {Avatar} from 'antd'

import {urlResolve} from 'app/helpers'

class ProfileIcon extends Component {
  // componentDidMount() {
  //   const naturalHeight = document.querySelector('.ant-avatar-image img').naturalHeight
  //   const naturalWidth = document.querySelector('.ant-avatar-image img').naturalWidth
  //   const image = $('.ant-avatar-image img')
  //
  //   if(naturalWidth > naturalHeight) {
  //     image.width('auto', '!important').height('100%', '!important')
  //   }
  //   else {
  //     image.width('100%', '!important').height('auto', '!important')
  //   }
  // }

  render() {
    const {avatar, name, type}  = this.props

    return <Link to={type === 'salon' ? '/salon/admin/salon#content' : '/profile#content'}>
      <Avatar
        src={urlResolve(avatar)}
      />
      <div className='username'>{name}</div>
    </Link>
  }
}

export default ProfileIcon
