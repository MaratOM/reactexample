import React, {Component} from 'react'

import formInit from 'app/components/forms/helpers/formInit'
import FormLayout from './FormLayout'

import SignInFormData from './data/SignInFormData'

class SignInForm extends Component {
  render() {
    return (
        <FormLayout formName='signIn'
                    fields={SignInFormData}
                    onSubmit={this.props.onSubmit}
                    formInit={formInit(SignInFormData)}
                    submitButtonValue='Войти'
                    submitButtonLoading={this.props.submitButtonLoading}
        />
    )
  }
}

export default SignInForm
