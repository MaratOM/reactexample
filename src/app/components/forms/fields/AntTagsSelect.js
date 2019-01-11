import React, {Component} from 'react'
import {connect} from 'react-redux'
import {change} from 'redux-form'

import {Select} from 'antd'
const Option = Select.Option

class AntTagsSelect extends Component{
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.props.changeTokenFieldValue(this.props.formName, this.props.tokenType, value)
  }

  render() {
    const children = this.props.suggestions.reduce((suggestions, suggestion) => {
      suggestions.push(<Option key={suggestion}>{suggestion}</Option>)
      return suggestions
    }, [])

    return <Select
        mode='tags'
        style={{ width: '100%'}}
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
        defaultValue={this.props.defaultValue}
      >
        {children}
      </Select>
  }
}

const mapDispatchToProps = {
  changeTokenFieldValue: (formName, tokenType, value) => dispatch => {
    dispatch(change(formName, tokenType, value))
  }
}

export default connect(null, mapDispatchToProps)(AntTagsSelect)
