import React, {Component} from 'react'

import formInit from 'app/components/forms/helpers/formInit'
import SalonFormData from './data/SalonFormData'
import FormLayout from './FormLayout'

class SalonForm extends Component {
  componentWillMount() {
    let formData = SalonFormData

    if(!formData.filter(field => field.name === 'avatar').length) {
      formData.unshift({
        name: 'avatar',
        label: 'Аватар',
        value: '',
        type: 'avatar',
        editable: true,
        required: false,
      })
    }

    if(this.props.salon && Object.keys(this.props.salon).length) {
      formData.forEach((field, index) => {
        if (typeof this.props.salon[field.name] !== 'undefined') {
          if (field.name === 'metro' || field.name === 'services' || field.name === 'businesses' || field.name === 'address') {
            formData[index].defaultValue = this.props.salon[field.name]
            formData[index].value = this.props.salon[field.name]
          }
          else if (field.name === 'active') {
            formData[index].checked = this.props.salon[field.name]
          }
          else {
            formData[index].value = this.props.salon[field.name]
          }
        }
      })

      this.submitButtonValue = 'Сохранить'
    }
    else {
      this.submitButtonValue = 'Создать'
    }

    this.formName = 'salon'
    this.formData = formData
  }

  render() {
    return (
      <FormLayout formName={this.formName}
                  fields={this.formData}
                  onSubmit={this.props.onSubmit}
                  formInit={formInit(this.formData)}
                  submitButtonValue={this.submitButtonValue}
                  submitButtonLoading={this.props.submitButtonLoading}
      />
    )
  }
}

export default SalonForm
