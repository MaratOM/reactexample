import {defineState} from 'redux-localstore'
import R from 'ramda'
import {PLACE_SALON_DATA,
  USER_SIGN_OUT,
  SAVE_SALON_RECEIPT_SUCCESS,
  COMPLETE_SALON_RECEIPT_SUCCESS,
  DELETE_ORDER_SUCCESS} from 'app/actions/actionTypes'

const initialState = defineState({})('salon')
let newState = {}
export default (state = initialState, {type, payload}) => {
  switch(type) {
    case PLACE_SALON_DATA:
      return payload
    case USER_SIGN_OUT:
      return {}

    case SAVE_SALON_RECEIPT_SUCCESS:
      newState = R.clone(state)
      newState.ordersPending[payload.oid] = payload
      return newState

    case COMPLETE_SALON_RECEIPT_SUCCESS:
      newState = R.clone(state)
      const order = newState.ordersPending[payload]
      order.status = 'complete'
      delete newState.ordersPending[payload]
      newState.orders[payload] = order
      return newState

    case DELETE_ORDER_SUCCESS:
      newState = R.clone(state)
      delete newState.ordersPending[payload]
      return newState

    default:
      return state
  }
}
