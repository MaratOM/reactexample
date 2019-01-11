import React from 'react'
import {Form, Icon, Input, Switch, Checkbox, DatePicker, Tooltip} from 'antd'
import InputMask from 'react-input-mask'
import locale from 'antd/lib/date-picker/locale/ru_RU'
import moment from 'moment' //needs for localization
import 'moment/locale/ru'

import MetroInput from 'app/components/forms/fields/MetroInput'
import ServicesInput from 'app/components/forms/fields/ServicesInput'
import BusinessesInput from 'app/components/forms/fields/BusinessesInput'
import AddressInput from 'app/components/forms/fields/AddressInput'
import AvatarUpload from 'app/components/forms/fields/AvatarUpload'

const FormItem = Form.Item
const { TextArea } = Input

export default ({
                       input,
                       label,
                       icon,
                       type,
                       required,
                       defaultChecked,
                       onText,
                       offText,
                       description,
                       align,
                       formName,
                       initialValue,
                       disabled,
                       addonBefore,
                       addonAfter,
                       defaultValue,
                       extra,
                       handleChange,
                       meta: {touched, error}
                     }) => {
  let element
  let validateStatus = ''
  let help = ''
  let id = ''
  let tooltip
  const prefix = icon
    ? <Icon type={icon} style={{color: 'rgba(0,0,0,.25)'}} />
    : ''
  let formItemLayout

  switch(type) {
    case 'metro':
      element = <MetroInput
        {...input}
        formName={formName}
        handleChange={handleChange}
        defaultValue={defaultValue}
      />
      break
    case 'services':
      element = <ServicesInput
        {...input}
        formName={formName}
        defaultValue={defaultValue}
      />
      break
    case 'businesses':
      element = <BusinessesInput
          {...input}
          formName={formName}
          defaultValue={defaultValue}
      />
      break
    case 'phone':
      element = <InputMask
        {...input}
        type={type}
        mask='+7\ (999) 999 99 99'
        maskChar=' '
        placeholder='+7 (___) ___ __ __'
      />
      break
    case 'sum':
      element = <InputMask
          {...input}
          type={type}
          mask='99999'
          maskChar=''
          placeholder='____'
      />
      break
    case 'avatar':
      element = <AvatarUpload
          {...input}
          initialValue={initialValue}
          formName={formName}
          defaultValue={defaultValue}
      />
      break
    case 'address':
      element = <AddressInput
        {...input}
        initialValue={initialValue}
        formName={formName}
        defaultValue={defaultValue}
      />
      break
    case 'password':
      element = <Input
        {...input}
        prefix={prefix}
        placeholder={label}
        type={type}
      />
      break
    case 'textarea':
      element = <TextArea
        {...input}
        prefix={prefix}
        placeholder={label}
        type={type}
        autosize={{ minRows: 3}}
      />
      break
    case 'checkbox':
      element = <Checkbox
        {...input}
        defaultChecked={defaultChecked}
      />
      break
    case 'switch':
      element = <Switch
        {...input}
        defaultChecked={defaultChecked}
        checkedChildren={onText}
        unCheckedChildren={offText}
        disabled={disabled}
      />
      break
    case 'date':
      delete input.value
      element = <DatePicker
        {...input}
        placeholder={label}
        locale={locale}
        defaultValue={moment('2000-01-01', 'YYYY-MM-DD')}
      />
      break
    case 'email':
      element =
        <Input
          {...input}
          prefix={prefix}
          placeholder='E-mail, для салонов телефон'
          disabled={disabled}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
        />
      break
    default:
      element =
        <Input
          {...input}
          prefix={prefix}
          placeholder={label}
          disabled={disabled}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
        />
      break
  }

  if(align === 'right') {
    formItemLayout = {
      labelCol: {span: 16},
      wrapperCol: {span: 2},
    }
  }
  else {
    formItemLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 11},
    }
  }

  if(touched) {
    if(error) {
      id = 'error'
      validateStatus = 'error'
      help = error
    }
    else if(!error && required) {
      id = 'success'
      validateStatus = 'success'
    }
  }

  if(description) {
    tooltip = <Tooltip title={description}>
      <Icon type='question-circle-o' />
    </Tooltip>
  }

  label = <span className={required ? 'ant-form-item-required' : undefined}>
    {label}&nbsp;
    {tooltip && tooltip}
  </span>

  return (
    <FormItem
      key={formName + label}
      {...formItemLayout}
      label={label}
      help={help}
      validateStatus={validateStatus}
      hasFeedback
      id={id}
      extra={extra}
    >
      {element}
    </FormItem>
  )
}
