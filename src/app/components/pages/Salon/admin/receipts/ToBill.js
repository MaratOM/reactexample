import React, {Component} from 'react'
import {connect} from 'react-redux'
import {change, reset, SubmissionError} from 'redux-form'
import {message} from 'antd'

import {receiptResetToBillClient} from 'app/actions/local'
import {receiptLoadToBillClient, saveSalonReceipt} from 'app/actions/remote'
import ToBillForm from 'app/components/forms/ToBillForm'
import LoadUserForm from 'app/components/forms/LoadUserForm'

class ToBill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showToBillForm: false, //true only for Sample (should be false)
      userData: {}
    }
    this.resetForms = this.resetForms.bind(this)
    this.loadUserSubmit = this.loadUserSubmit.bind(this)
    this.toBillSubmit = this.toBillSubmit.bind(this)
  }

  componentWillMount() {
    if(typeof this.props.userData !== 'undefined' && this.props.userData !== {}) {
      this.setState({userData: this.props.userData})
    }
  }

  componentDidMount() {
    /* for testing server only */

    // const data = {services: ['Маникюр'], sumOrder: '1800', mateId: 'N262', sid: 45, salon_id: '5b6ad9989dd32e81bea5d346'}
    // this.props.saveSalonReceipt(data)

    /* for testing server only */
  }

  loadUserSubmit(values) {
    if(values.userName) {
      this.resetForms()
    }
    else {
      const componentThis = this
      return this.props.loadUser(values.mateId)
        .then(result => {
          if(result.status !== 200) {
            throw new SubmissionError(result.data)
          }
          else {
            const userName = `${componentThis.props.userData.name} ${componentThis.props.userData.surname}`
            componentThis.props.changeLoadUserUserNameValue(userName)
            componentThis.setState({
              showToBillForm: true,
              userData: componentThis.props.userData,
            })
          }
        })
        .then(() => {
          componentThis.props.changeToBillMateIdFieldValue(values.mateId)
        })
        .catch(e => {
          throw new SubmissionError(e.errors)
        })
    }
  }

  toBillSubmit(values) {
    const componentThis = this
    if(typeof values.mateId !== 'undefined') {
      values.mateId = values.mateId.toUpperCase()
      values.services = [values.services]
      this.props.saveSalonReceipt(values)
        .then(() => {
          message.success('Спасибо! Клиент уже видит чек! После того, как он укажет сумму, которую он оплатит понами, чек можно будет подтвердить.')
          componentThis.resetForms()
        })
    }
  }

  resetForms() {
    this.props.resetForm('loadUser')
    this.props.resetForm('toBill')
    this.setState({
      userData: {},
      showToBillForm: false
    })
    this.props.changeLoadUserUserNameValue('')
    this.props.resetUser()
  }

  render() {
    return <div>
        <LoadUserForm
          idFieldData={{
            label: 'ID клиента',
            description: 'ID клиента (латинская буква и три цифры)',
          }}
          idFieldRequired={true}
          nameFieldData={{
            label: 'Имя клиента',
          }}
          userData={this.state.userData}
          onSubmit={this.loadUserSubmit}
        />

        {this.state.showToBillForm &&
          <ToBillForm
            onSubmit={this.toBillSubmit}
          />}
      </div>
  }
}

const mapStateToProps = state => ({
  userData: state.toBillClient
})

const mapDispatchToProps = {
  changeToBillMateIdFieldValue: value => dispatch => {
    dispatch(change('toBill', 'mateId', value))
  },
  changeLoadUserUserNameValue: value => dispatch => {
    dispatch(change('loadUser', 'userName', value))
  },
  resetForm: (formName) => dispatch => {
    dispatch(reset(formName))
  },
  loadUser: receiptLoadToBillClient,
  resetUser: receiptResetToBillClient,
  saveSalonReceipt,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToBill)
