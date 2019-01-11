export default (formData) => {
  const formInit = {}
  formData.forEach(({name, value, checked}) => {
    if(typeof checked !== 'undefined') {
      Object.assign(formInit, {[name]: checked})
    }
    else {
      Object.assign(formInit, {[name]: value})
    }
  })

  return formInit
}
