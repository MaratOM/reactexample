class FormValidators {
  name(data) {
    if(data.length < 1) {
      return 'Обязательное поле!'
    }
  }

  surname(data) {
    if(data.length < 1) {
      return 'Обязательное поле!'
    }
  }

  email(data) {
    if(!data || data === '' || data === 'undefined') {
      return 'Обязательное поле!'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(data) && !/^[\d()+\-\s]{10,20}$/ig.test(data)) {
      return 'Некорректный E-mail адрес или телефон!'
    }
  }

  password(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
    if(data.length < 8) {
      return 'Не менее 8 символов!'
    }
  }

  password2(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
    if(data.length < 8) {
      return 'Не менее 8 символов!'
    }
  }

  address(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  dob(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  mateId(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  policyAccepted(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  sum(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  sumPon(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  metro(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  phone(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  services(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  description(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  schedule(data) {
    if(!data) {
      return 'Обязательное поле!'
    }
  }

  validate(callback, data) {
    if(typeof this[callback] !== 'undefined') {
      return this[callback](data)
    }
  }
}

export default FormValidators
