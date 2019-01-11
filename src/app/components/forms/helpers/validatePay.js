import FormValidators from './FormValidators'

export default values => {
  const Validators = new FormValidators()
  const errors = {}

  for (let name in values) {
    errors[name] = Validators.validate(name, values[name])
    if(name === 'sumPon' && parseInt(values[name], 10) > values.availablePonSum) {
      errors[name] = `Сумма не может превышать количества имеющихся понов (${values.availablePonSum}п.)`
    }
    if(name === 'sumPon' && parseInt(values[name], 10) > values.sumOrder) {
      errors[name] = `Сумма не может превышать полную стоимость услуги (${values.sumOrder}р.)`
    }
    if(name === 'sumPon' && parseInt(values[name], 10) === 0) {
      errors[name] = null
    }

  }

  return errors
}
