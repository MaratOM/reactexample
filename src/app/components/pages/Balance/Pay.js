import React, {Component, Fragment}from 'react'
import {connect} from 'react-redux'
import {change, submit} from 'redux-form'
import {Modal, Button, Icon, message} from 'antd'

import {sendPay} from 'app/actions/remote'
import PayForm from 'app/components/forms/PayForm'

class Pay extends Component {
  constructor(props) {
    super(props)

    this.formName = 'pay' + props.order.oid
    this.state = {
      visible: false,
      confirmLoading: false,
      sumRub: this.props.order.sumOrder,
    }

    this.onChangeSumPon = this.onChangeSumPon.bind(this)
  }

  onChangeSumPon(sumPon) {
    if(sumPon <= this.props.availablePonSum && sumPon <= this.props.order.sumOrder) {
      const sumRub = this.props.order.sumOrder - sumPon
      this.props.changeFieldValue('pay' + this.props.order.oid, 'sumRub', sumRub)
      this.setState({sumRub})
    }
  }

  PaySubmit = async values => {
    const result = await this.props.sendPay(values)

    result && result.status && result.status === 200
      ? message.success(`Спасибо! Оплатите, пожалуйста ${this.state.sumRub} рублей в салоне! Как только салон подтвердит оплату Вам и Вашим Подружкам будут начислены Поны!`)
      : message.error(result.data)
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleOk = async () => {
    this.setState({confirmLoading: true})
    await this.props.submitForm(this.formName)
    this.props.setPendingsTab()
    this.setState({
      confirmLoading: false,
      visible: false
    })
  }

  handleCancel = () => {
    this.props.setPendingsTab()
    this.setState({visible: false})
  }

  render() {
    return <Fragment>
        <Button type='primary' onClick={this.showModal}><Icon type='calculator' /></Button>
        <Modal title='Оплатить Понами'
               visible={this.state.visible}
               onOk={this.handleOk}
               confirmLoading={this.state.confirmLoading}
               onCancel={this.handleCancel}
               okText='Отправить в салон'
               cancelText='Отменить'
        >
          <PayForm
              order={this.props.order}
              onChangeSumPon={this.onChangeSumPon}
              onSubmit={this.PaySubmit}
              availablePonSum={this.props.availablePonSum}
          />
        </Modal>
      </Fragment>
  }
}

const mapStateToProps = state => ({
  availablePonSum: state.user.data.balance
})

const mapDispatchToProps = {
  changeFieldValue: (formName, fieldName, value) => dispatch => {
    dispatch(change(formName, fieldName, value))
  },
  submitForm: formName => dispatch => {
    dispatch(submit(formName))
  },
  sendPay,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pay)
