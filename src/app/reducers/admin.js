import {defineState} from 'redux-localstore'
import {FETCH_MODELS_LIST_SUCCESS,
  FETCH_MODEL_FIELDS_LIST_SUCCESS,
  FETCH_MODEL_FIELDS_FILTER_LIST_SUCCESS} from 'app/actions/adminActionTypes'

const initialState = defineState({})('admin')
export default (state = initialState, {type, payload}) => {
  switch(type) {
    case FETCH_MODELS_LIST_SUCCESS:
      return {...state, fieldEdit: {...state.fieldEdit, models: payload}}

    case FETCH_MODEL_FIELDS_LIST_SUCCESS:
      return {...state, fieldEdit: {...state.fieldEdit, fields: payload}}

    case FETCH_MODEL_FIELDS_FILTER_LIST_SUCCESS:
      const {data, filters} = payload
      return {...state, fieldEdit: {...state.fieldEdit, data, filters}}

    default:
      return state
  }
}
