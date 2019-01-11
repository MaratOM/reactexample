import axios from 'axios'

import * as actionTypes from 'app/actions/adminActionTypes'
import {urlResolve} from 'app/helpers'

export const fetchModelsList = data => async (dispatch, getState) => {
  dispatch({type: actionTypes.FETCH_MODELS_LIST_START})

  try {
    const user = getState().user
    const result = await axios({
      method: 'GET',
      url: urlResolve('admin/edit/models'),
      headers: {'Authorization': user.token},
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.FETCH_MODELS_LIST_SUCCESS,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.FETCH_MODELS_LIST_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const fetchModelFieldsList = model => async (dispatch, getState) => {
  dispatch({type: actionTypes.FETCH_MODEL_FIELDS_LIST_START})

  try {
    const user = getState().user
    const result = await axios({
      method: 'GET',
      url: urlResolve('admin/edit/models/' + model),
      headers: {'Authorization': user.token},
    })

    if(result.status === 200) {
      dispatch({
        type: actionTypes.FETCH_MODEL_FIELDS_LIST_SUCCESS,
        payload: result.data
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.FETCH_MODEL_FIELDS_LIST_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const fetchModelFieldsDataList = filters => async (dispatch, getState) => {
  dispatch({type: actionTypes.FETCH_MODEL_FIELDS_FILTER_LIST_START})

  try {
    const user = getState().user
    const result = await axios({
      method: 'POST',
      url: urlResolve('admin/edit/data'),
      headers: {'Authorization': user.token},
      data: filters,
    })

    const {status, data} = result
    if(status === 200) {
      dispatch({
        type: actionTypes.FETCH_MODEL_FIELDS_FILTER_LIST_SUCCESS,
        payload: {filters, data}
      })
    }

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.FETCH_MODEL_FIELDS_FILTER_LIST_FAILURE,
      payload: null,
      error: true
    })
  }
}

export const fetchModelFieldsDataSave = data => async (dispatch, getState) => {
  dispatch({type: actionTypes.FETCH_MODEL_FIELDS_FILTER_LIST_START})

  try {
    const user = getState().user
    const result = await axios({
      method: 'POST',
      url: urlResolve('admin/edit/save'),
      headers: {'Authorization': user.token},
      data,
    })

    return result
  }
  catch(err) {
    dispatch({
      type: actionTypes.FETCH_MODEL_FIELDS_FILTER_LIST_FAILURE,
      payload: null,
      error: true
    })
  }
}
