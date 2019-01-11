import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {change} from 'redux-form'
import {AutoComplete} from 'antd'

class AddressInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
    }

    this.getLocation = this.getLocation.bind(this)
  }

  getLocation(val) {
    const componentThis = this
    axios({method: 'POST', url: 'https://dadata.ru/api/v1/suggest/address', headers: {
      'Authorization': 'Token XXXX',
      'Content-Type': 'application/json'
    }, data: {
      query: 'Москва ' + val
    }}).then(function(data) {
      let addresses = []
      data.data.suggestions.forEach((item) => {
        addresses.push(item.value)
      })

      componentThis.setState({
        isLoading: false,
        options: addresses,
      })
    })
  }

  getSelectedLocationData(val, callback, formName) {
    axios({method: 'POST', url: 'https://dadata.ru/api/v1/suggest/address', headers: {
      'Authorization': 'Token bf69a05b6ce842dcd0cbc159648d19a8c49fdf33',
      'Content-Type': 'application/json'
    }, data: {
      query: val, count: 1
    }}).then(function(data) {
      callback(formName, 'city', data.data.suggestions[0].data.city)
      callback(formName, 'country', data.data.suggestions[0].data.country)
      callback(formName, 'geo_lat', data.data.suggestions[0].data.geo_lat)
      callback(formName, 'geo_lon', data.data.suggestions[0].data.geo_lon)
    })
  }

  onSelect(option) {
    this.props.changeFieldValue(this.props.formName, 'address', option)
    this.getSelectedLocationData(option, this.props.changeFieldValue, this.props.formName)
  }

  render() {
    return (
        <AutoComplete
            dataSource={this.state.options}
            onChange={this.getLocation}
            onSelect={option => this.onSelect(option)}
            placeholder='Начните набирать адрес'
            defaultValue={this.props.defaultValue}
        />
    )
  }
}

const mapDispatchToProps = {
  changeFieldValue: (formName, fieldName, value) => dispatch => {
    dispatch(change(formName, fieldName, value))
  }
}

export default connect(null, mapDispatchToProps)(AddressInput)
