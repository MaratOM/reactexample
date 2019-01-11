import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import storeSynchronize from 'redux-localstore'
import {createBrowserHistory} from 'history'
import {syncHistoryWithStore} from 'react-router-redux'

import reducers from 'app/reducers'

export default ({children, initialState = {}}) => {
  const store = createStore(
      reducers,
      initialState,
      composeWithDevTools(
        applyMiddleware(thunk)
      )
    )

  storeSynchronize(store)

  const history = syncHistoryWithStore(createBrowserHistory(), store)

  return <Provider history={history} store={store}>
      {children}
    </Provider>
}