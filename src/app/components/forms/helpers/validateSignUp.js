import FormValidators from './FormValidators'

export default values => {
  const Validators = new FormValidators()
  const errors = {}

  for (let name in values) {
    errors[name] = Validators.validate(name, values[name])
  }

  if(values['password'] && values['password2'] && (values['password'] !== values['password2'])) {
    const passDontMatchErrorText = `Пароли не совпадают!`
    errors['password'] = errors['password'] ? `${errors['password']} ${passDontMatchErrorText}` : passDontMatchErrorText
    errors['password2'] = errors['password2'] ? `${errors['password2']} ${passDontMatchErrorText}` : passDontMatchErrorText
  }

  return errors
}
