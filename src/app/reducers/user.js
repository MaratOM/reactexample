import {defineState} from 'redux-localstore'
import R from 'ramda'
import {
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_UP_SUCCESS,
  UPDATE_USER_SUCCESS,
  USER_SIGN_OUT,
  ACCEPT_PAY_SUCCESS,
  PASS_URL_PARAMS,
  CLEAR_URL_PARAMS} from 'app/actions/actionTypes'
import {ANONYMOUS} from 'app/access/roleTypes'

const userAnon = {roles: [ANONYMOUS]}
const initialState = defineState(userAnon)('user')
export default (state = initialState, {type, payload}) => {
  let newState

  switch(type) {
    case USER_SIGN_IN_SUCCESS:
      return payload
    case USER_SIGN_UP_SUCCESS:
      return payload
    case UPDATE_USER_SUCCESS:
      const token = state.token
      return {...payload, token}
    case USER_SIGN_OUT:
      return {...userAnon}
    case ACCEPT_PAY_SUCCESS:
      newState = R.clone(state)
      const order = newState.ordersPending[payload.oid]

      /* for debugging */
      // newState.ordersPending['81'].sumPon = 0
      // newState.ordersPending['81'].sumRub = newState.ordersPending['81'].sumOrder
      // newState.ordersPending['81'].status = 'created'
      // newState.ordersPending['82'].sumPon = 0
      // newState.ordersPending['82'].sumRub = newState.ordersPending['82'].sumOrder
      // newState.ordersPending['82'].status = 'created'
      // newState.ordersPending['83'].sumPon = 0
      // newState.ordersPending['83'].sumRub = newState.ordersPending['83'].sumOrder
      // newState.ordersPending['83'].status = 'created'
      /* for debugging */

      order.sumPon = parseInt(payload.sumPon, 10)
      order.sumRub = order.sumOrder - order.sumPon
      order.status = 'clientConfirmed'

      newState.data.balance -= order.sumPon
      return newState
    case PASS_URL_PARAMS:
      return {...state, urlParams: payload}

    case CLEAR_URL_PARAMS:
      newState = R.clone(state)
      delete newState.urlParams
      return newState

    default:
      return state
  }
}
