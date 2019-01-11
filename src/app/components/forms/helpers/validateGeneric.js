import FormValidators from './FormValidators'

export default values => {
  const Validators = new FormValidators()
  const errors = {}

  for (let name in values) {
    errors[name] = Validators.validate(name, values[name])
  }

  return errors
}
