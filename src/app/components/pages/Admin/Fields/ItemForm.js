import React, {Component} from 'react'
import {Form, Input, Button, Icon, message} from 'antd'

const FormItem = Form.Item

class HorizontalLoginForm2 extends Component {
  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const result = await this.props.fetchModelFieldsDataSave(values)

        if(result && result.status === 200) {
          message.success('Entity saved!')
        }
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <FormItem className='hidden'>
          {getFieldDecorator('model', {})(
            <Input type='hidden'/>
          )}
        </FormItem>

        <FormItem className='hidden'>
          {getFieldDecorator('_id', {})(
            <Input type='hidden'/>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator(this.props.fieldName || 'no-field', {})(
            <Input/>
          )}
        </FormItem>

        <FormItem className='button'>
          <Button
            type='primary'
            htmlType='submit'
          >
            <Icon type='api' />
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    // props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    const fieldsValues = {}
    fieldsValues.model = Form.createFormField({value: props.model})
    fieldsValues._id = Form.createFormField({value: props._id})
    fieldsValues[props.fieldName] = Form.createFormField({value: props.fieldData})

    return fieldsValues
  }
})(HorizontalLoginForm2)
