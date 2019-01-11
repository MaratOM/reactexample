import React from 'react'
import {mount} from 'enzyme'
import ConnectRedux from 'ConnectRedux'
import {BrowserRouter as Router} from 'react-router-dom'
import {Button} from 'antd'



import Banner from 'app/components/pages/Front/Banner'

describe('banner button for logged in user', () => {
  it('does not show Button for logged in user', () => {
    const initialState = {
      user: {roles: ['MEMBER']},
    }

    const wrapped = mount(
        <Router>
          <ConnectRedux initialState={initialState}>
            <Banner/>
          </ConnectRedux>
        </Router>)

    expect(wrapped.find(Button).length).toEqual(0)
    wrapped.unmount()
  })
})


describe('banner button for anonymous user', () => {
  let initialState
  let wrapped

  beforeEach(() => {
    initialState = {
      user: {roles: ['ANONYMOUS']},
    }
  })

  afterEach(() => wrapped.unmount())

  it('shows default Button value', () => {
    wrapped = mount(
      <Router>
        <ConnectRedux initialState={initialState}>
          <Banner/>
        </ConnectRedux>
      </Router>)

    expect(wrapped.find(Button).render().text()).toEqual('Присоединяйтесь!')
  })

  it('shows Button value with promocode', () => {
    wrapped = mount(
      <Router>
        <ConnectRedux initialState={initialState}>
          <Banner promocode='NYSM128'/>
        </ConnectRedux>
      </Router>)

    expect(wrapped.find('.banner').length).toEqual(1)
    expect(wrapped.find(Button).render().text()).toEqual('Присоединяйтесь! Ваш промокод NYSM128')
  })
})
