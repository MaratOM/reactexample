import React, {Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Divider} from 'antd'

class LogoIcon extends Component {
  render() {
    let linkPath = '/front'

    if(this.props.user.urlParams) {
      linkPath += this.props.user.urlParams
    }

    const logoDot = <span className='logo-dot'>.</span>

    return <Divider><Link to={linkPath}><h1>ПОДРУЖКИ{logoDot}ОНЛАЙН</h1></Link></Divider>
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(LogoIcon)
