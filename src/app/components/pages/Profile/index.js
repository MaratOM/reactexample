import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SubmissionError} from 'redux-form'
import moment from 'moment'

import {Icon, message} from 'antd'

import {updateUser} from 'app/actions/remote'
import access from 'app/access'

import AccessDenied from 'app/components/pages/AccessDenied'
import ProfileForm from 'app/components/forms/ProfileForm'
import Page from 'app/components/layouts/Page'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      submitButtonLoading: false,
    }
  }

  onSubmit = values => {
    this.setState({submitButtonLoading: true})
    const userData = {...values}

    delete userData.uplineId
    userData.dob = moment(userData.dob, 'YYYY-MM-DD').add(12,'hours')
    delete userData.avatar
    delete userData.password2

    if(userData.password === '') {
      delete userData.password
    }

    userData.phone = userData.phone.replace( /[ ()]/g, '')
    userData._id = this.props.user._id

    return this.props.updateUser(userData)
      .then((result) => {
        this.setState({submitButtonLoading: false})

        if(result.status !== 200) {
          if(typeof result.data === 'string') {
            message.error(result.data)
          }
          else {
            message.error(result.statusText)
            throw new SubmissionError(result.data)
          }
        }
        else {
          message.success('Данные профиля обновлены!')
        }
      })
      .catch(e => {
        throw new SubmissionError(e.errors)
      })
  }

  render() {
    if(!access.isGranted(this.props.user.roles, 'Profile')) {
      return <AccessDenied/>
    }

    return <Page>
      <div className='container'>
        <div className='row content' id='content'>
          <div className='col-12'>
            <h2><Icon type='user' /> Профиль</h2>
            <ProfileForm
                user={this.props.user}
                onSubmit={this.onSubmit}
                submitButtonValue='Сохранить'
                submitButtonLoading={this.state.submitButtonLoading}
            />
          </div>
        </div>
      </div>
    </Page>
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = {
  updateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
