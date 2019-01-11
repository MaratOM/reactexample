import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types';

import formInit from 'app/components/forms/helpers/formInit'
import FormLayout from './FormLayout'
import fields from './data/LoadUserFormData'

let LoadUserForm = props => {
  if(props.idFieldData) {
    fields[0].label = props.idFieldData.label
    fields[0].description = props.idFieldData.description
    fields[0].required = props.idFieldRequired
  }

  let allFields = R.clone(fields)
  let submitButtonValue = 'Загрузить данные'

  if(typeof props.userData !== 'undefined'
      && !R.isEmpty(props.userData)
      && typeof props.userData.name !== 'undefined') {
    allFields.push({
      name: 'userName',
      label: (props.nameFieldData && props.nameFieldData.label) || 'Имя пользователя',
      value: '',
      type: 'input',
      editable: false,
      required: false,
      icon: 'user',
    })
    allFields[0]['editable'] = false
    submitButtonValue = 'Сбросить'
  }
  else {
    allFields = R.clone(fields)
  }

  return (
    <FormLayout formName='loadUser'
                fields={allFields}
                onSubmit={props.onSubmit}
                formInit={formInit(allFields)}
                submitButtonValue={submitButtonValue}
    />
  )
}

LoadUserForm.propTypes = {
  userData: PropTypes.object
}

export default LoadUserForm
