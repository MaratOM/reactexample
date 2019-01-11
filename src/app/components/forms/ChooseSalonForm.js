import React, {Component} from 'react'

import FormLayout from './FormLayout'
import formInit from 'app/components/forms/helpers/formInit'

class ChooseSalonForm extends Component {
  handleChange(tags) {
    this.props.filterSalons(tags)
  }

  render() {
    const fields = [
      {
        name: 'Metro',
        type: 'metro',
        label: 'Метро',
        editable: true,
        defaultValue: this.props.filters && this.props.filters.metro ? this.props.filters.metro : [],
      }
    ]

    return (
      <FormLayout formName='choose-salon'
        onChange={tags => this.handleChange(tags)}
        fields={fields}
        formInit={formInit(fields)}
        noButton={true}
      />
    )
  }
}

export default ChooseSalonForm
