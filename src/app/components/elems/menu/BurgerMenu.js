import React, {Component} from 'react'
import {slide as Menu} from 'react-burger-menu'
import {decorator as reduxBurgerMenu} from 'redux-burger-menu'
import {NavLink as Link} from 'react-router-dom'
import {connect} from 'react-redux'
// import $ from 'jquery'
import {Icon} from 'antd'

import access from 'app/access/index'
import * as roleTypes from 'app/access/roleTypes'
import componentsMenuLinks from './menuLinks'

class BurgerMenu extends Component {
  state = {
    urlParams: this.props.user.urlParams,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({urlParams: nextProps.user.urlParams})
  }

  changeBMButtonStyle = () => {
    // const windowWidth = $(window).width()
    // const containerWidth = $('.container').width()
    // const bmButton = $('.bm-burger-bars')
    // const bmButtonWidth = bmButton.width()
    //
    // if(windowWidth - containerWidth > bmButtonWidth * 3) {
    //   bmButton.removeClass('dark')
    //   bmButton.addClass('light')
    // }
    // else {
    //   bmButton.removeClass('light')
    //   bmButton.addClass('dark')
    // }
  }

  componentDidMount() {
    // const componentThis = this
    //
    // componentThis.changeBMButtonStyle()
    // $(window).resize(function() {componentThis.changeBMButtonStyle()})
  }

  render() {
    const pageLinks = componentsMenuLinks.map(link => {
      if(link.path.indexOf('http') !== -1) {
        return <a key={link.path} href={link.path}><Icon type={link.icon}/> {link.title}</a>
      }

      // for not to show menu for salon user if he didn't add salon yet
      let roles = this.props.user.roles
      if(this.props.user.type === 'salon' && !Object.keys(this.props.salon).length) {
        roles = [roleTypes.MEMBER, roleTypes.SALON_ADMIN_ADDING]
      }

      if(access.isGranted(roles, link.componentName)) {
        if(this.state.urlParams) {
          if(link.path === '/front' || link.path === '/sign') {
            link.path += this.state.urlParams
          }
        }
        else {
          //otherwise links are cached and urlParams not cleared
          if(link.path.indexOf('?') !== -1) {
            if (link.path.indexOf('/front') !== -1) {
              link.path = '/front'
            }
            else if (link.path.indexOf('/sign') !== -1) {
              link.path = '/sign'
            }
          }
        }

        return <Link
            exact={!!link.exact}
            key={'burger' + link.path}
            to={link.path}>
              <Icon type={link.icon}/> {link.title}
          </Link>
      }

      return null
    })
    return (
      <Menu>
        {pageLinks}
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  salon: state.salon,
})

export default reduxBurgerMenu(connect(mapStateToProps)(BurgerMenu))
