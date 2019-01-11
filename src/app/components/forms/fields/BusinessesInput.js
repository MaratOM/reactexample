import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchBusinessesList} from 'app/actions/remote'
import AntTagsSelect from './AntTagsSelect'

class BusinessesInput extends Component {
  componentDidMount() {
    this.props.fetchBusinessesList()
  }

  render() {
    return this.props.businesses.length
      ? <AntTagsSelect
          suggestions={this.props.businesses}
          tokenType='businesses'
          formName={this.props.formName}
          placeholder='Начните вводить услугу (можно добавлять новые)'
          defaultValue={this.props.defaultValue}
      />
      : null
  }
}

const mapStateToProps = state => ({
  businesses: state.businesses,
})

const mapDispatchToProps = {
  fetchBusinessesList,
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessesInput)
