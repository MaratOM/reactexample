import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import {
  fetchModelsList,
  fetchModelFieldsList,
  fetchModelFieldsDataList,
  fetchModelFieldsDataSave
} from 'app/actions/remote/admin'

import Form from './Form'
import Content from './Content'

class Fields extends Component {
  componentWillMount() {
    this.props.fetchModelsList()
  }
  render() {
    return <Fragment>
        <Form
          models={this.props.admin.models || []}
          fields={this.props.admin.fields || []}
          filters={this.props.admin.filters || {}}
          fetchModelFieldsList={this.props.fetchModelFieldsList}
          fetchModelFieldsDataList={this.props.fetchModelFieldsDataList}
        />
        <Content
          data={this.props.admin.data || []}
          filters={this.props.admin.filters || {}}
          fetchModelFieldsDataSave={this.props.fetchModelFieldsDataSave}
        />
      </Fragment>
  }
}

const mapStateToProps = state => ({
  user: state.user,
  admin: state.admin.fieldEdit,
})

const mapDispatchToProps = {
  fetchModelsList,
  fetchModelFieldsList,
  fetchModelFieldsDataList,
  fetchModelFieldsDataSave,
}

export default connect(mapStateToProps, mapDispatchToProps)(Fields)
