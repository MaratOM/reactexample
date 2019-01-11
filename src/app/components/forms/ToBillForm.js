import React, {Component} from 'react'

import formInit from 'app/components/forms/helpers/formInit'
import FormLayout from './FormLayout'

import ToBillFormData from './data/ToBillFormData'

class ToBillForm extends Component {
  render() {
    return (
      <FormLayout formName='toBill'
                  fields={ToBillFormData}
                  onSubmit={this.props.onSubmit}
                  formInit={formInit(ToBillFormData)}
                  submitButtonValue='Выставить счёт'
      />
    )
  }
}

export default ToBillForm
