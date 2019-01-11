import React, {Component} from 'react'
import {Form, InputNumber, Button, Select} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class HorizontalLoginForm extends Component {
  componentDidMount() {
    const fieldsValues = {
      model: this.props.filters.model || [],
      field: this.props.filters.field || [],
      skip: this.props.filters.skip || 1,
      limit: this.props.filters.limit || 1,
    }
    this.props.form.setFieldsValue(fieldsValues)
  }

  handleModelChange = async value => {
    await this.props.fetchModelFieldsList(value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.fetchModelFieldsDataList(values)
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form

    const models = this.props.models
        ? this.props.models.map(option => <Option key={option} value={option}>{option}</Option>)
        : []
    const fields = this.props.fields
        ? this.props.fields.map(option => <Option key={option} value={option}>{option}</Option>)
        : []

    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <FormItem label='model' colon={true}>
          {getFieldDecorator('model', {})(
            <Select style={{ width: 120 }} onChange={this.handleModelChange}>
              {models}
            </Select>
          )}
        </FormItem>

        <FormItem label='field' colon={true}>
          {getFieldDecorator('field', {})(
            <Select style={{ width: 120 }}>
              {fields}
            </Select>
          )}
        </FormItem>

        <FormItem label='skip' colon={true}>
          {getFieldDecorator('skip', {})(
            <InputNumber
              style={{ width: 120 }}
              min={0}
              max={100000}
            />
          )}
        </FormItem>

        <FormItem label='limit' colon={true}>
          {getFieldDecorator('limit', {})(
            <InputNumber
              style={{ width: 120 }}
              min={1}
              max={100000}
            />
          )}
        </FormItem>

        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
          >
            Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(HorizontalLoginForm)
