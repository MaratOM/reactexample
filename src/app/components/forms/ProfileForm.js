import moment from 'moment'

import SignUpForm from './SignUpForm'
import SignUpFormData from './data/SignUpFormData'
import validate from './helpers/validateProfile'

class ProfileForm extends SignUpForm {
  componentWillMount() {
    let formData = SignUpFormData

    if(this.props.user.type === 'mate' && !formData.filter(field => field.name === 'avatar').length) {
      formData.unshift({
        name: 'avatar',
        label: 'Аватар',
        value: '',
        type: 'avatar',
        editable: true,
        required: false,
      })
    }

    formData = formData.filter(item => item.name !== 'policyAccepted' && item.name !== 'promocode')

    if(this.props.user.type === 'salon') {
      formData = formData.filter(item => item.name !== 'uplineId')
    }

    formData.forEach((field, index) => {
      if(field.type === 'password') {
        field.required = false
      }

      if(field.name === 'uplineId') {
        field.editable = false
        field.description = ''
      }

      if(typeof this.props.user[field.name] !== 'undefined') {
        if (field.type === 'switch') {
          formData[index].checked = this.props.user[field.name]
        }
        if (field.name === 'dob') {
          const dob = moment(this.props.user[field.name], 'YYYY-MM-DD')
          formData[index].value = dob
          formData[index].defaultValue = dob
        }
        else {
          formData[index].value = this.props.user[field.name]
        }
      }
    })

    this.formName = 'profile'
    this.formData = formData
    this.validate = validate
    this.submitButtonValue = 'Сохранить'
  }

  render() {
    return super.render()
  }
}

export default ProfileForm
