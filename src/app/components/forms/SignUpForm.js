import React, {Component} from 'react'

import formInit from 'app/components/forms/helpers/formInit'
import FormLayout from './FormLayout'
import validate from './helpers/validateSignUp'

import SignUpFormData from './data/SignUpFormData'

class SignUpForm extends Component {
  componentWillMount() {
    this.handleAsync = this.handleAsync.bind(this)

    this.formData = SignUpFormData

    if(this.props.singSalonForm) {
      this.formData = this.formData.filter(item => item.name !== 'uplineId' && item.name !== 'promocode')
    }

    this.formName = 'signUp'
    this.validate = validate
    this.asyncValidate = this.handleAsync
    this.asyncBlurFields = ['uplineId', 'promocode']
    this.submitButtonValue = 'Зарегистрироваться'
  }

  handleAsync(values) {
    if(values.uplineId === '') {
      this.formData[0].extra = ''
    }
    if(values.promocode === '') {
      this.formData[1].extra = ''
    }
    if (values.uplineId || values.promocode) {
      const {uplineId = null, promocode = null} = values

      return this.props.handleAsync(uplineId, promocode)
        .then(result => {
          const errors = {}

          if(result.uplineId) {
            if (result.uplineId.status === 200) {
              const {name, surname} = result.uplineId.data
              this.formData[0].extra = `${name} ${surname}`
            }
            else {
              errors.uplineId = 'Нет пользователя с таким ID! Введите корректный ID или очистите это поле.'
              this.formData[0].extra = ''
            }
          }
          if(result.promocode) {
            if (result.promocode.status === 200) {
              delete errors.promocode
              const {sum} = result.promocode.data
              this.formData[1].extra = `Промокод принят! После регистрации на Вашем счету будет ${sum} понов (1 пон = 1 рубль)!`
            }
            else {
              errors.promocode = 'Нет такого промокода! Введите корректный промокод или очистите это поле.'
              this.formData[1].extra = ''
            }
          }

          if(Object.keys(errors).length) {
            throw errors
          }

          this.props.setSignUpTab()
        })
    }
    else {
      return new Promise(resolve => resolve())
    }
  }

  render() {
    return (
      <FormLayout formName={this.formName}
                  fields={this.formData}
                  onSubmit={this.props.onSubmit}
                  formInit={formInit(this.formData)}
                  validate={this.validate}
                  asyncValidate={this.asyncValidate}
                  asyncBlurFields={this.asyncBlurFields}
                  submitButtonValue={this.submitButtonValue}
                  submitButtonLoading={this.props.submitButtonLoading}
      />
    )
  }
}

export default SignUpForm
