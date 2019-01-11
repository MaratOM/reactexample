import {defineState} from 'redux-localstore'
import {FETCH_SALONS_FILTER_LIST_SUCCESS} from 'app/actions/actionTypes'

const initialState = defineState({})('salons')
export default (state = initialState, {type, payload}) => {
  switch(type) {
    case FETCH_SALONS_FILTER_LIST_SUCCESS:
      return payload

    default:
      return state
  }
}
