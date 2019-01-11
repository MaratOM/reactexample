import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {reset, SubmissionError} from 'redux-form'
import {withRouter} from 'react-router-dom'

import {Tabs, Icon, Alert, Steps, message} from 'antd'

import {signUpLoadAsync, signInUser, signUpUser, verifyUser, resetUserPass} from 'app/actions/remote'
import {signOutUser, passUrlParams, clearUrlParams} from 'app/actions/local'
import access from 'app/access'

import NotFound from 'app/components/pages/NotFound'
import SignInForm from 'app/components/forms/SignInForm'
import SignUpForm from 'app/components/forms/SignUpForm'
import ResetPassForm from 'app/components/forms/ResetPassForm'
import Page from 'app/components/layouts/Page'

const Step = Steps.Step
const Tab = Tabs.TabPane

class Sign extends Component {
  constructor() {
    super()
    this.state = {
      activeTab: '1',
      verifyAlert: null,
      steps: false,
      submitButtonLoading: false,
    }
  }

  componentWillMount() {
    if(window.location.pathname === '/signout') {
      this.props.signOutUser()
      this.props.history.push('/sign/1')
    }

    if(window.location.pathname.indexOf('sign/verify') !== -1) {
      const {type, code} = this.props.match.params
      let alertType = 'success'

      this.props.verifyUser(type, code)
        .then(result => {
          if(!result.data || !result.data.verified) {
            alertType = 'error'
          }
          this.setState({
            verifyAlert: <Alert type={alertType} description={result.data.message} showIcon/>
          })
        })
    }

    if(!access.isGranted(this.props.user.roles, 'Sign')) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({activeTab: nextProps.match.params.tabId})
  }

  componentDidMount() {
    this.setState({activeTab: this.props.match.params.tabId})

    /* programmatic sign up for debugging */

    // const values = {
    //   city: 'Москва',
    //   country: 'Россия',
    //   dob: 'Tue Aug 21 2018 11:27:10 GMT+0300 (Москва, стандартное время)',
    //   email: 'ken11@ken.ru',
    //   gender: true,
    //   name: 'Ken',
    //   newsSubscribed: true,
    //   password: '11111111',
    //   phone: '+744398447009494',
    //   surname: 'Ken',
    //   uplineId: 'N261',
    // }

    // this.props.signUpUser(values)

    /* programmatic sign up for debugging */
  }

  userSignInSubmit = values => {
    this.setState({submitButtonLoading: true})

    return this.props.signInUser(values)
      .then(result => {
        this.setState({submitButtonLoading: false})

        if(result.status !== 200) {
          if(result.data.email === 'E-mail не подтверждён!') {
            this.setState({steps: true})
          }
          throw new SubmissionError(result.data)
        }
        else {
          if(this.props.user.type === 'salon' && !Object.keys(this.props.salon).length) {
            this.props.history.push('/salon/admin/salon')
          }
          else if(this.props.user.type === 'salon' && Object.keys(this.props.salon.ordersPending).length) {
            this.props.history.push('/salon/admin/receipts/3')
          }
          else if(this.props.user.type === 'mate' && Object.keys(this.props.user.ordersPending).length) {
            this.props.history.push('/balance/4')
          }
          else {
            this.props.history.push('/howto')
          }
          this.props.clearUrlParams()
        }
      })
      .catch(e => {
        throw new SubmissionError(e.errors)
      })
  }

  userSignUpSubmit = values => {
    this.setState({submitButtonLoading: true})
    values.city = 'Москва'
    const valuesToSend = {...values}

    valuesToSend.newsSubscribed = valuesToSend.newsSubscribed || false
    valuesToSend.dob = valuesToSend.dob.toDate().toString()
    delete valuesToSend.password2
    valuesToSend.phone = valuesToSend.phone.replace( /[ ()]/g, '')

    return this.props.signUpUser(valuesToSend)
      .then(result => {
        this.setState({submitButtonLoading: false})

        if(result.status !== 200) {
          throw new SubmissionError(result.data)
        }
        else {
          this.props.history.push('/howto')
          message.success('Мы выслали письмо на указанный Вами email. Пожалуйста, перейдите по ссылке в нём для завершения регистрации.')
          this.props.clearUrlParams()
        }
      })
      .catch(e => {
        throw new SubmissionError(e.errors)
      })
  }

  userResetPassSubmit = values => {
    this.setState({submitButtonLoading: true})

    return this.props.resetUserPass(values)
      .then(result => {
        this.setState({submitButtonLoading: false})

        if(result.status !== 200) {
          throw new SubmissionError(result.data)
        }
        else {
          this.props.resetForm('resetPass')
          message.success(result.data.message)
        }
      })
      .catch(e => {
        throw new SubmissionError(e.errors)
      })
  }

  clickTab(tabKey) {
    this.setState({activeTab: tabKey})
  }

  setSignUpTab() {
    this.setState({activeTab: '2'})
  }

  render() {
    if(+this.props.match.params.tabId > 3) {
      return <NotFound/>
    }

    let parameters = {}
    let promoAlert
    const search = this.props.location.search.substring(1)
    if(search) {
      if(!this.props.user.urlParams) {
        this.props.passUrlParams(this.props.location.search)
      }
      parameters = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
      if(parameters.p) {
        const promoMessage = `У вас есть промокод ${parameters.p}. Используйте его для получения бонуса!`
        promoAlert = <Alert message={promoMessage} type='success'/>
      }
    }

    const BetaMessage = () => <div>
        Наш сервис только набирает базу пользователей. Спасибо, что Вы с нами в числе первых!<br/>Мы будем держать Вас в курсе всех наших движений <Icon type='smile' />
      </div>
    const betaAlert = <Alert message={<BetaMessage/>} type='info'/>

    const stepsAlert = <Alert message='Необходима верификация E-mail. Пожалуйста, перейдите по ссылке, высланной вам при регистрации и поробуйте войти снова.' type='error'/>
    const steps = this.state.steps &&
      <Fragment>
        <Steps>
          <Step status='finish' title='Регистрация пользователя' icon={<Icon type='user' />} />
          <Step status='finish' title='Подтверждение E-mail' icon={<Icon type='mail' />} />
          <Step status='wait' title='Готово' icon={<Icon type='smile-o' />} />
        </Steps>
        <hr/>
      </Fragment>

    return <Page>
      <div className='container'>
        <div className='row content'>
          <div className='col-12'>
            <h2><Icon type='login' /> Вход / <Icon type='plus-circle-o' /> Регистрация</h2>
            {this.state.verifyAlert && this.state.verifyAlert}
            {betaAlert && betaAlert}
            {promoAlert && promoAlert}
            {steps && stepsAlert}
            <Tabs activeKey={this.state.activeTab || '1'} onTabClick={(e) => this.clickTab(e)}>
              <Tab key='1' tab={<span><Icon type='login' /><span>Вход</span></span>}>
                {steps && steps}
                <SignInForm
                  onSubmit={this.userSignInSubmit}
                  submitButtonLoading={this.state.submitButtonLoading}
                />
              </Tab>
              <Tab className='sign-up-tab' key='2' tab={<span><Icon type='plus-circle-o' /><span>Регистрация</span></span>}>
                <p className='salon-reg-link'><a href='/sign-salon'>для регистрации салона перейдите по ссылке <Icon type='logout' /></a></p>
                <SignUpForm
                  setSignUpTab={this.setSignUpTab.bind(this)}
                  handleAsync={this.props.signUpLoadAsync}
                  onSubmit={this.userSignUpSubmit}
                  submitButtonLoading={this.state.submitButtonLoading}
                />
              </Tab>
              <Tab className='sign-up-tab' key='3' tab={<span><Icon type='lock' /><span>Восстановление пароля</span></span>}>
                <ResetPassForm
                  setSignUpTab={this.setSignUpTab.bind(this)}
                  onSubmit={this.userResetPassSubmit}
                  submitButtonLoading={this.state.submitButtonLoading}
                />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Page>
  }
}

const mapStateToProps = state => ({
  user: state.user,
  salon: state.salon,
})

const mapDispatchToProps = {
  resetForm: formName => dispatch => {
    dispatch(reset(formName))
  },
  signInUser,
  signUpLoadAsync,
  signUpUser,
  signOutUser,
  verifyUser,
  resetUserPass,
  passUrlParams,
  clearUrlParams,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sign))
