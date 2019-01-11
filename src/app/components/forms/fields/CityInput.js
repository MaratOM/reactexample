import React, {Component} from 'react'
import {connect} from 'react-redux'
import {change} from 'redux-form'

import { Select } from 'antd';
const Option = Select.Option;

import CitiesData from 'app/components/forms/data/Cities'

class CityInput extends Component {
  onSelect(option) {
    this.props.changeFieldValue(this.props.formName, 'address', option)
    this.getSelectedLocationData(option, this.props.changeFieldValue, this.props.formName)
  }

  render() {
    const options = CitiesData.map(item => <Option key={item} value={item}>{item}</Option>)

    return (
      <Select
        defaultValue={this.props.defaultValue}
        onSelect={this.onSelect}
      >
        {options}
      </Select>
    )
  }
}

const mapDispatchToProps = {
  changeFieldValue: (formName, fieldName, value) => dispatch => {
    dispatch(change(formName, fieldName, value))
  }
}

export default connect(null, mapDispatchToProps)(CityInput)
