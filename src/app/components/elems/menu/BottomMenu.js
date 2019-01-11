import React, {Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
import {connect} from 'react-redux'

import access from 'app/access'
import * as roleTypes from 'app/access/roleTypes'
import componentsMenuLinks from './menuLinks'

class BottomMenu extends Component {
  state = {
    urlParams: this.props.user.urlParams,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({urlParams: nextProps.user.urlParams})
  }

  render() {
    const pageLinks = componentsMenuLinks.map(link => {
      if(link.path.indexOf('http') !== -1) {
        return <a key={link.path} href={link.path}>{link.title}</a>
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
            key={'bottom' + link.path}
            to={link.path}>
              {link.title}
          </Link>
      }

      return null
    })

    return <div className='col-12 bottom-menu'>
        {pageLinks}
      </div>
  }
}

const mapStateToProps = state => ({
  user: state.user,
  salon: state.salon,
})

export default connect(mapStateToProps)(BottomMenu)
