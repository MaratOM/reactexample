import url from 'url'
import React from 'react'

export const formatNumberThousands = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
export const parseNumberThousands = value => value.replace(/\s?|(,*)/g, '')

export const formatPlural = (num, variants) => {
  num = num.toString()
  const lastDigit = +num[num.length - 1]
  let beforeLastDigit = null
  let plural = ''

  if(num.toString().length > 1) {
    beforeLastDigit = +num[num.length - 2]
  }

  if(beforeLastDigit === 1) {
    plural = variants[2]
  }
  else if(lastDigit === 1) {
    plural = variants[0]
  }
  else if(lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
    plural = variants[1]
  }
  else {
    plural = variants[2]
  }

  return plural
}

export const urlResolve = uri => url.resolve(process.env.REACT_APP_BACKEND, uri || 'images/avatars/default/female.jpg')

const addLeadingZero = num => num < 10 ? '0' + num : num

export const DateWithTime = props => {
  const {date} = props
  const day = addLeadingZero(date.getDate())
  const month = addLeadingZero(date.getMonth() + 1)
  const year = date.getFullYear().toString().substr(2)
  const hours = date.getHours()
  const minutes = addLeadingZero(date.getMinutes())

  return <span className='date-with-time'>{day}/{month}/{year}<br/>{hours}:{minutes}</span>
}

export const formatDateWithTime = date => {
  let day = date.getDate()
  day = day < 10 ? '0' + day : day
  let month = date.getMonth() + 1
  month = month < 10 ? '0' + month : month
  const year = date.getFullYear().toString().substr(2)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export const PhoneButton = props => {
  let {phone} = props
  let phoneNumber
  let phoneTitle

  phone = phone.toString()
  phoneTitle = phoneNumber = phone.indexOf('+') === -1 ? '+' + phone : phone
  phoneTitle = phoneTitle.split('')
  phoneTitle.splice(2, 0, '(')
  phoneTitle.splice(6, 0, ')')
  phoneTitle.splice(10, 0, '-')
  phoneTitle = phoneTitle.join('')

  return <a className='phone-number' href={`tel:${phoneNumber}`}>{phoneTitle}</a>
}
