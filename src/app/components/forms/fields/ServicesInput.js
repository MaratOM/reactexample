import React from 'react'

import AntTagsSelect from './AntTagsSelect'

export default (props) => {
  return <AntTagsSelect
      suggestions={[]}
      tokenType='businesses'
      formName={props.formName}
      placeholder='Начните вводить услугу (можно добавлять новые)'
      defaultValue={props.defaultValue}
  />
}
