import React from 'react'
import R from 'ramda'

import AntTagsSelect from './AntTagsSelect'
import MoscowMetroData from 'app/components/forms/data/MoscowMetro.json'

export default (props) => {
  const suggestions = R.uniq(MoscowMetroData.map(item => item.Name))

  return <AntTagsSelect
      suggestions={suggestions}
      tokenType='metro'
      formName={props.formName}
      placeholder='Начните вводить странции метро'
      defaultValue={props.defaultValue}
      // handleChange={props.handleChange} ** From TokenInput field
      // allowAddNew={false} ** From TokenInput field
  />
}
