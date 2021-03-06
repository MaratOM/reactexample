export default [
  {
    name: 'name',
    label: 'Название',
    value: '',
    type: 'input',
    editable: true,
    required: true,
    icon: 'flag',
  },
  {
    name: 'email',
    label: 'E-mail',
    value: '',
    type: 'input',
    editable: true,
    required: true,
    icon: 'mail',
  },
  {
    name: 'site',
    label: 'Адрес сайта',
    value: '',
    type: 'input',
    editable: true,
    required: false,
    addonBefore: 'http://',
  },
  {
    name: 'phone',
    label: 'Телефон',
    value: '',
    type: 'phone',
    editable: true,
    required: true,
    icon: 'phone',
  },
  {
    name: 'metro',
    label: 'Станция метро',
    value: '',
    defaultValue: [],
    type: 'metro',
    editable: true,
    required: true,
  },
  {
    name: 'address',
    label: 'Адрес',
    value: '',
    type: 'address',
    editable: true,
    required: true,
  },
  {
    name: 'description',
    label: 'Описание',
    value: '',
    type: 'textarea',
    editable: true,
    required: true,
  },
  {
    name: 'schedule',
    label: 'Режим работы',
    value: '',
    type: 'input',
    editable: true,
    required: true,
  },
  // {
  //   name: 'services',
  //   label: 'Услуги',
  //   value: '',
  //   defaultValue: [],
  //   type: 'services',
  //   editable: true,
  //   required: true,
  //   description: 'Услуги, предоставляемые Вашим салоном. По этим услугам он будет появляться в поиске',
  // },
  {
    name: 'businesses',
    label: 'Направления',
    value: '',
    defaultValue: [],
    type: 'businesses',
    editable: true,
    required: true,
    description: 'Направления деятельности Вашего салона.',
  },
  {
    name: 'city',
    type: 'hidden',
    editable: true,
  },
  {
    name: 'country',
    type: 'hidden',
    editable: true,
  },
  {
    name: 'geo_lat',
    type: 'hidden',
    editable: true,
  },
  {
    name: 'geo_lon',
    type: 'hidden',
    editable: true,
  },
  {
    name: 'active',
    label: 'Подключение',
    type: 'switch',
    onText: 'подключено',
    offText: 'отключено',
    editable: true,
    disabled: false,
    // extra: 'После включения этого свитча вы сможете принимать заказы от клиентов сервиса ПОДРУЖКИ.ОНЛАЙН! Вы можете выключить его в любой момент.',
    extra: 'Это самая главная кнопка, которая подключает Вас к сервису. Когда она выключена, салон появляется в списке с пометкой "не активен" и к вам не приходят клиенты. Вы можете в любой момент включать и выключать её.',
  },
]
