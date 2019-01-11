import React, {Component} from 'react'
import {Icon} from 'antd'

import Page from 'app/components/layouts/Page'

class AccessDenied extends Component {
  render() {
    return <Page>
      <div className='container access-denied'>
        <div className='row content'>
          <div className='col-12'>
            <h2><Icon type='lock' /> У Вас нет прав для просмотра этой страницы</h2>
            <div className='wrapper'>
              <Icon type='warning' />
              <div className='no-panic'>Без паники!</div>
              <div className='go-to-menu'>Просто перейдите к любому пункту меню <Icon type='arrow-down' /></div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  }
}

export default AccessDenied
