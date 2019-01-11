import React from 'react'
import {mount} from 'enzyme'
import axios from 'axios'
import moxios from 'moxios'
import {BrowserRouter as Router} from 'react-router-dom'

import ConnectRedux from 'ConnectRedux'
import Sign from 'app/components/pages/Sign/index'
import SignInForm from 'app/components/forms/SignInForm'

beforeAll(function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000
})

beforeEach(() => {
  moxios.install(axios)
})

afterEach(() => {
  moxios.uninstall(axios)
})

describe('sign page', () => {
  let wrapped
  let initialState

  beforeEach(() => {
    initialState = {
      user: {roles: ['ANONYMOUS']},
    }
    wrapped = mount(
      <Router>
        <ConnectRedux initialState={initialState}>
          <Sign/>
        </ConnectRedux>
      </Router>)
  })

  afterEach(() => {
    wrapped.unmount()
  })

  it('shows 3 bottom menu items for anonymous user', done => {
    expect(wrapped.find('.bottom-menu a').length).toEqual(3)
    done()
  })

  it('shows 3 tabs', done => {
    expect(wrapped.find('.ant-tabs-tab').length).toEqual(3)
    done()
  })

  it('shows form', done => {
    expect(wrapped.find('.ant-form').length).toEqual(1)
    done()
  })

  it('shows sign up form submit button value as Регистрация', done => {
    const signUpTab = wrapped.find('.ant-tabs-tab').at(1)
    expect(signUpTab.render().text()).toEqual('Регистрация')
    done()
  })

  it('shows sign in form submit button value as Войти', done => {
    const signInButton = wrapped.find('button').at(2)
    expect(signInButton.render().text()).toEqual('Войти')

    const signInForm = wrapped.find('.ant-form').at(0)
    expect(signInForm.find('button').render().text()).toEqual('Войти')
    done()
  })

  it('processes sign in form', done => {
    wrapped.find(SignInForm).simulate('submit', {
        email: 'mail@mail.ru',
        password: '11111111111',
      })

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()

      if(!request) done()

      request.respondWith({
        status: 200,
        data: {
          user: {
            type: 'mate',
            roles: ['MATE']
          }
        },
        response: {
          status: 200,
          data: {user: {
            type: 'mate',
            roles: ['MATE']
          }}
        }
      })
      .then(function () {
        wrapped.update()
        expect(wrapped.find('.bottom-menu a').length).toEqual(3)
        console.log(wrapped.find('h2').render().text())
        done()
      })
      .catch(err => console.log(err))
    })
  })
})
