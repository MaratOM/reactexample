import React, {Component} from 'react'

import formInit from 'app/components/forms/helpers/formInit'
import FormLayout from './FormLayout'

import ResetPassFormData from './data/ResetPassFormData'

class ResetPassForm extends Component {
  render() {
    return (
        <FormLayout formName='resetPass'
                    fields={ResetPassFormData}
                    onSubmit={this.props.onSubmit}
                    formInit={formInit(ResetPassFormData)}
                    submitButtonValue='Выслать новый пароль'
                    submitButtonLoading={this.props.submitButtonLoading}
        />
    )
  }
}

export default ResetPassForm
