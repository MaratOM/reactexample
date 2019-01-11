import React, {Component} from 'react'
import {Icon} from 'antd'

import Page from 'app/components/layouts/Page'

class NotFound extends Component {
  render() {
    return <Page>
      <div className='container not-found'>
        <div className='row content'>
          <div className='col-12'>
            <h2><Icon type='close-circle-o' /> Такой страницы у нас нет</h2>
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

export default NotFound
