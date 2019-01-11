import axios from 'axios'

import * as actionTypes from 'app/actions/actionTypes'
import {urlResolve} from 'app/helpers'

export const signInUser = values => async dispatch => {
  dispatch({type: actionTypes.USER_SIGN_IN_START})

  try {
    const result = await axios.post(urlResolve('users/signin'), values)
    if(result.status === 200) {
      if (result.data.user.type === 'salon' && result.data.salon) {
        dispatch({
          type: actionTypes.PLACE_SALON_DATA,
          payload: result.data.salon
        })
      }

      dispatch({
        type: actionTypes.USER_SIGN_IN_SUCCESS,
        payload: result.data.user
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.USER_SIGN_IN_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const signUpUser = values => async dispatch => {
  dispatch({type: actionTypes.USER_SIGN_UP_START})

  try {
    const result = await axios.post(urlResolve('users/signup'), values)
    if(result.status === 200) {
      dispatch({
        type: actionTypes.USER_SIGN_UP_SUCCESS,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.USER_SIGN_UP_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const verifyUser = (type, code) => async dispatch => {
  dispatch({type: actionTypes.VERIFY_USER_START})

  try {
    return await axios.get(urlResolve(`users/verify/${type}/${code}`))
  }
  catch(err) {
    dispatch({
      type: actionTypes.VERIFY_USER_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const resetUserPass = data => async () => {
  try {
    return await axios({
      method: 'POST',
      url: urlResolve('users/resetpass'),
      data,
    })
  }
  catch(err) {
    throw new Error(err)
  }
}

export const updateUser = values => async (dispatch, getState)  => {
  dispatch({type: actionTypes.UPDATE_USER_START})

  try {
    const token = getState().user.token
    const result = await axios({
      method: 'PUT',
      url: urlResolve('users'),
      headers: {'Authorization': token},
      data: values
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_USER_SUCCESS,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.UPDATE_USER_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const refreshUser = _id => async (dispatch, getState)  => {
  dispatch({type: actionTypes.UPDATE_USER_START})

  try {
    const token = getState().user.token
    const result = await axios({
      method: 'GET',
      url: urlResolve('users/refresh/' + _id),
      headers: {'Authorization': token},
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_USER_SUCCESS,
        payload: result.data.user
      })

      if(result.data.salon) {
        dispatch({
          type: actionTypes.PLACE_SALON_DATA,
          payload: result.data.salon
        })
      }
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.UPDATE_USER_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const userConnectSalon = sid => async (dispatch, getState)  => {
  dispatch({type: actionTypes.UPDATE_USER_START})

  try {
    const {_id, token} = getState().user
    const result = await axios({
      method: 'POST',
      url: urlResolve('users/connect-salon'),
      headers: {'Authorization': token},
      data: {_id, sid}
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_USER_SUCCESS,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.UPDATE_USER_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const receiptLoadToBillClient = mateId => async (dispatch, getState) => {
  dispatch({type: actionTypes.FETCH_TO_BILL_CLIENT_START})

  try {
    const result = await axios({
      url: urlResolve('users/' + mateId + '/name'),
      headers: {'Authorization': getState().user.token}
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.FETCH_TO_BILL_CLIENT_SUCCESS,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.FETCH_TO_BILL_CLIENT_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const saveSalonReceipt = data => async (dispatch, getState) => {
  dispatch({type: actionTypes.SAVE_SALON_RECEIPT_START})

  try {
    data.sid = getState().salon.sid
    data.salon_id = getState().salon._id

    const result = await axios({
      method: 'POST',
      url: urlResolve('orders'),
      data,
      headers: {'Authorization': getState().user.token}
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.SAVE_SALON_RECEIPT_SUCCESS,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.SAVE_SALON_RECEIPT_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const sendPay = data => async (dispatch, getState) => {
  dispatch({type: actionTypes.ACCEPT_PAY_START})

  try {
    const user = getState().user
    const result = await axios({
      method: 'PUT',
      url: urlResolve('orders'),
      headers: {'Authorization': user.token},
      data: {
        order_id: user.ordersPending[data.oid]._id,
        sumPon: data.sumPon,
        status: 'clientConfirm',
      },
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.ACCEPT_PAY_SUCCESS,
        payload: data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.ACCEPT_PAY_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const signUpLoadUpline = mateId => async () => {
  try {
    return await axios({url: urlResolve('users/' + mateId + '/name')})
  }
  catch(err) {
    throw new Error(err)
  }
}

export const signUpLoadPromocode = code => async () => {
  try {
    return await axios({url: urlResolve('users/promocode/' + code)})
  }
  catch(err) {
    throw new Error(err)
  }
}

export const signUpLoadAsync = (uplineId, promocode) => async () => {
  try {
    let result = {}
    if(uplineId) {
      result.uplineId = await signUpLoadUpline(uplineId)()
    }
    if(promocode) {
      result.promocode = await signUpLoadPromocode(promocode)()
    }

    return result
  }
  catch(err) {
    throw new Error(err)
  }
}

export const addSalon = values => async (dispatch, getState)  => {
  dispatch({type: actionTypes.ADD_SALON_START})

  try {
    const result = await axios({
      method: 'POST',
      url: urlResolve('salons'),
      headers: {'Authorization': getState().user.token},
      data: values
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.PLACE_SALON_DATA,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.ADD_SALON_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const updateSalon = values => async (dispatch, getState)  => {
  dispatch({type: actionTypes.UPDATE_SALON_START})

  try {
    const result = await axios({
      method: 'PUT',
      url: urlResolve('salons'),
      headers: {'Authorization': getState().user.token},
      data: values
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.PLACE_SALON_DATA,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.UPDATE_SALON_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const activateSalon = values => async (dispatch, getState)  => {
  dispatch({type: actionTypes.UPDATE_SALON_START})

  try {
    const result = await axios({
      method: 'PUT',
      url: urlResolve('salons/activate'),
      headers: {'Authorization': getState().user.token},
      data: values
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.PLACE_SALON_DATA,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.UPDATE_SALON_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const completeSalonReceipt = oid => async (dispatch, getState) => {
  dispatch({type: actionTypes.COMPLETE_SALON_RECEIPT_START})

  try {
    const user = getState().user
    const salon = getState().salon
    const result = await axios({
      method: 'PUT',
      url: urlResolve('orders'),
      headers: {'Authorization': user.token},
      data: {
        order_id: salon.ordersPending[oid]._id,
        status: 'complete',
      },
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.COMPLETE_SALON_RECEIPT_SUCCESS,
        payload: oid
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.COMPLETE_SALON_RECEIPT_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const deleteSalonPicture = ({sid, url}) => async (dispatch, getState) => {
  dispatch({type: actionTypes.DELETE_SALON_PICTURE_START})

  try {
    const user = getState().user
    const result = await axios({
      method: 'DELETE',
      url: urlResolve('salons/file/' + sid),
      headers: {'Authorization': user.token},
      data: {url}
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.PLACE_SALON_DATA,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.DELETE_SALON_PICTURE_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const fetchSalonsList = data => async (dispatch, getState) => {
  dispatch({type: actionTypes.FETCH_SALONS_FILTER_LIST_START})

  try {
    let current = getState().salons.current || 1
    let filters = getState().salons.filters || {}

    switch(typeof data) {
      case 'number':
        current = data
        break
      case 'object':
        current = 1
        filters = {...filters, ...data}
        break
      default:
        break
    }

    const result = await axios({
      method: 'POST',
      url: urlResolve('salons/list/' + current),
      data: {filters},
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.FETCH_SALONS_FILTER_LIST_SUCCESS,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.FETCH_SALONS_FILTER_LIST_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const fetchSalonsByName = data => async (dispatch, getState) => {
  dispatch({type: actionTypes.FETCH_SALONS_FILTER_LIST_START})

  try {
    const current = 1
    const filters = {name: data}

    return await axios({
      method: 'POST',
      url: urlResolve('salons/list/' + current),
      data: {filters},
    })
  }
  catch(err) {
    throw new Error(err)
  }
}

export const findSalon = data => async () => {
  try {
    return await axios({
      method: 'GET',
      url: urlResolve('salons/find/' + (data || 'no-data')),
    })
  }
  catch(err) {
    throw new Error(err)
  }
}

export const fetchSalon = sid => async (dispatch, getState) => {
  try {
    return await axios({
      method: 'GET',
      url: urlResolve('salons/' + sid),
      headers: {'Authorization': getState().user.token},
    })
  }
  catch(err) {
    throw new Error(err)
  }
}

export const deleteOrder = oid => async (dispatch, getState) => {
  dispatch({type: actionTypes.DELETE_ORDER_START})

  try {
    const user = getState().user
    const salon = getState().salon
    const result = await axios({
      method: 'DELETE',
      url: urlResolve('orders/' + salon.ordersPending[oid]._id),
      headers: {'Authorization': user.token},
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.DELETE_ORDER_SUCCESS,
        payload: oid
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.DELETE_ORDER_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const fetchBusinessesList = () => async (dispatch, getState) => {
  dispatch({type: actionTypes.FETCH_BUSINESSES_LIST_START})

  try {
    const result = await axios({
      url: urlResolve('businesses'),
      headers: {'Authorization': getState().user.token}
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.FETCH_BUSINESSES_LIST_SUCCESS,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.FETCH_BUSINESSES_LIST_FAILURE,
      payload: err,
      error: true
    })
  }
}

