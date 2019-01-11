import React from 'react'

export default [
  {
    name: 'email',
    label: 'E-mail',
    value: '',
    type: 'email',
    editable: true,
    required: true,
    icon: 'user',
    description: 'E-mail, указанный Вами при регистрации. Для салонов также можно указать телефон.',
  },
  {
    name: 'password',
    label: 'Пароль',
    value: '',
    type: 'password',
    editable: true,
    required: true,
    icon: 'lock',
    description: 'Не менее 8 символов',
    extra: <a href="/sign/3">забыли пароль?</a>
  },
]
