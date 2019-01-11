import {FETCH_TO_BILL_CLIENT_SUCCESS, RESET_TO_BILL_CLIENT_SUCCESS} from 'app/actions/actionTypes'

const initialState = {}
export default (state = initialState, {type, payload}) => {
  switch(type) {
    case FETCH_TO_BILL_CLIENT_SUCCESS:
      return {...state, ...payload}
    case RESET_TO_BILL_CLIENT_SUCCESS:
      return initialState
    default:
      return state
  }
}
