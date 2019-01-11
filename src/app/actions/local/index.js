import * as actionTypes from 'app/actions/actionTypes'

export const signOutUser = () => dispatch => {
  dispatch({
    type: actionTypes.USER_SIGN_OUT,
    payload: {}
  })
}

export const addAvatar = data => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_USER_SUCCESS,
    payload: data
  })
}

export const receiptResetToBillClient = () => dispatch => {
  dispatch({
    type: actionTypes.RESET_TO_BILL_CLIENT_SUCCESS,
    payload: {}
  })
}

export const placeSalonData = data => dispatch => {
  dispatch({
    type: actionTypes.PLACE_SALON_DATA,
    payload: data
  })
}

export const passUrlParams = data => dispatch => {
  dispatch({
    type: actionTypes.PASS_URL_PARAMS,
    payload: data
  })
}

export const clearUrlParams = () => dispatch => {
  dispatch({
    type: actionTypes.CLEAR_URL_PARAMS,
    payload: null
  })
}
