import React, {Component} from 'react'

import {formatDateWithTime} from "app/helpers"
import formInit from 'app/components/forms/helpers/formInit'
import FormLayout from './FormLayout'
import validate from './helpers/validatePay'
import fields from './data/PayFormData'

class PayForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formName: '',
      formData: {},
    }
    this.changePones = this.changePones.bind(this)
  }
  
  componentWillMount() {
    const formName = `pay${this.props.order.oid}`
    const formData = fields.map(field => {
      switch (field.name) {
        case 'oid':
          field.value = this.props.order.oid
          break
        case 'salonName':
          field.value = this.props.order.salonName
          break
        case 'created':
          field.value = formatDateWithTime(new Date(this.props.order.created))
          break
        case 'sumOrder':
          field.value = this.props.order.sumOrder
          break
        case 'sumPon':
          field.value = 0
          field.handleChange = this.changePones
          break
        case 'sumRub':
          field.value = this.props.order.sumRub
          break
        case 'availablePonSum':
          field.value = this.props.availablePonSum
          break
        default:
          break
      }

      return field
    })
    
    this.setState({formName, formData})
  }
  
  changePones(sumPon) {
    this.props.onChangeSumPon(sumPon)
  }

  render() {
    return (
      <FormLayout formName={this.state.formName}
                  fields={this.state.formData}
                  onSubmit={this.props.onSubmit}
                  formInit={formInit(this.state.formData)}
                  validate={validate}
                  noButton={true}
      />
    )
  }
}

export default PayForm
