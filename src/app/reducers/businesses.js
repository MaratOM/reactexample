import {defineState} from 'redux-localstore'
import {FETCH_BUSINESSES_LIST_SUCCESS} from 'app/actions/actionTypes'

const initialState = defineState({})('businesses')
export default (state = initialState, {type, payload}) => {
  switch(type) {
    case FETCH_BUSINESSES_LIST_SUCCESS:
      return payload

    default:
      return state
  }
}
