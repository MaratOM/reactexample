import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SubmissionError} from 'redux-form'
import {withRouter} from 'react-router-dom'
import {Steps, Icon} from 'antd'

import {signUpUser} from 'app/actions/remote'
import access from 'app/access'

import SignUpPage from './SignUpPage'
import Page from 'app/components/layouts/Page'

const Step = Steps.Step

class SignSalon extends Component {
  constructor() {
    super()
    this.state = {
      submitButtonLoading: false,
    }
  }

  componentWillMount() {
    if(!access.isGranted(this.props.user.roles, 'SignSalon')) {
      this.props.history.push('/')
    }
  }

  userSignUpSubmit = values => {
    this.setState({submitButtonLoading: true})
    values.city = 'Москва'
    const valuesToSend = {...values}

    valuesToSend.newsSubscribed = valuesToSend.newsSubscribed || false
    delete valuesToSend.password2

    valuesToSend.uplineId = null
    valuesToSend.phone = valuesToSend.phone.replace( /[ ()]/g, '')

    return this.props.signUpUser(valuesToSend)
      .then((result) => {
        this.setState({submitButtonLoading: false})

        if(result.status !== 200) {
          throw new SubmissionError(result.data)
        }
        else {
          this.props.history.push('/salon/admin/salon')
        }
      })
      .catch(e => {
        throw new SubmissionError(e.errors)
      })
  }

  render() {
    return <Page>
      <div className='container'>
        <div className='row content'>
          <div className='col-12'>
            <h2><Icon type='plus-circle-o' /> Регистрация салона</h2>
            <Steps>
              <Step status='finish' title='Регистрация администратора' icon={<Icon type='user' />} />
              <Step status='wait' title='Добавление данных салона' icon={<Icon type='solution' />} />
              <Step status='wait' title='Готово' icon={<Icon type='smile-o' />} />
            </Steps>
            <hr/>
            <SignUpPage
              onSubmit={this.userSignUpSubmit}
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
  signUpUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignSalon))
