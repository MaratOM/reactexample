import React, {Component} from 'react'

import SignUpForm from 'app/components/forms/SignUpForm'

class SingUpPage extends Component {
  render() {
    return <SignUpForm
      singSalonForm={true}
      onSubmit={this.props.onSubmit}
      submitButtonValue='Продолжить'
      submitButtonLoading={this.props.submitButtonLoading}
    />
  }
}

export default SingUpPage
