import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Field, reduxForm} from 'redux-form'
import {Form, Button} from 'antd'

import validateGeneric from './helpers/validateGeneric'
import renderField from './helpers/renderField'

const FormItem = Form.Item

let FormLayout = props => {
  const {fields, formName, handleChange, handleSubmit, submitButtonValue, submitButtonLoading, noButton} = props

  const buttonItemLayout = {
    wrapperCol: { span: 11, offset: 7 },
  }

  let tableRows = fields.map((row, index) => {
    let field = null
    if(row.type !== 'hidden') {
      // if(row.editable) {
        field = <Field
          key={row.type + index}
          name={row.name}
          component={renderField}
          type={row.type}
          label={row.label}
          icon={row.icon && row.icon}
          defaultChecked={typeof row.checked !== 'undefined' ? row.checked : false}
          onText={row.onText ? row.onText : ''}
          offText={row.offText ? row.offText : ''}
          description={row.description}
          required={row.required || false}
          align={row.align}
          formName={formName}
          initialValue={row.value}
          disabled={row.disabled || !row.editable || false}
          addonBefore={row.addonBefore || ''}
          addonAfter={row.addonAfter || ''}
          defaultValue={row.defaultValue || null}
          extra={row.extra || ''}
          handleChange={handleChange}
          onChange={(e) =>
            typeof row.handleChange === 'function'
              ? row.handleChange(e.target.value)
              : null
          }
        />
      // } else {
      //   // if(typeof row.value === 'object' && row.value.length) {
      //   //   row.value = row.value.join(', ')
      //   // }
      //   field = <p>{row.value}</p>
      // }
    }
    else {
      field = <Field
        key={row.type + index}
        name={row.name}
        component='input'
        type={row.type}
      />
    }

    return row.type !== 'hidden' ? field : null
  })

  return (
    <Form layout='horizontal' onSubmit={handleSubmit}>
      {tableRows}
      <FormItem key="submitButton" {...buttonItemLayout}>
        {!noButton &&
          <Button type="primary" htmlType="submit" loading={submitButtonLoading}>
            {submitButtonValue || "Submit"}
          </Button>
        }
      </FormItem>
    </Form>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    form: ownProps.formName,
    initialValues: ownProps.formInit,
    validate: ownProps.validate || validateGeneric,
    asyncValidate: ownProps.asyncValidate || null,
    asyncBlurFields: ownProps.asyncBlurFields || [],
  }
}

FormLayout = compose(
    connect(mapStateToProps),
    reduxForm({})
)(FormLayout)

export default FormLayout
