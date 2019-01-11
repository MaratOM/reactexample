import FormValidators from './FormValidators'

export default values => {
  const Validators = new FormValidators()
  const errors = {}

  for(let name in values) {
    if(name !== 'password' && name !== 'password2') {
      errors[name] = Validators.validate(name, values[name])
    }
    else {
      if(values[name] && values[name].length < 8) {
        errors[name] = 'Не менее 8 символов!'
      }
      if(values['password'] && !values['password2']) {
        errors['password2'] = 'Заполните поле "Пароль повторно"!'
      }
      if(values['password2'] && !values['password']) {
        errors['password'] = 'Заполните поле "Пароль"!'
      }
    }
  }

  if(values['password'] && values['password2'] && (values['password'] !== values['password2'])) {
    const passDontMatchErrorText = `Пароли не совпадают!`
    errors['password'] = errors['password'] ? `${errors['password']} ${passDontMatchErrorText}` : passDontMatchErrorText
    errors['password2'] = errors['password2'] ? `${errors['password2']} ${passDontMatchErrorText}` : passDontMatchErrorText
  }

  return errors
}
