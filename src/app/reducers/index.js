import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form'
import {reducer as burgerMenu} from 'redux-burger-menu';

import user from './user'
import salon from './salon'
import salons from './salons'
import businesses from './businesses'
import toBillClient from './toBillClient'
import admin from './admin'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  burgerMenu,
  user,
  salon,
  salons,
  businesses,
  toBillClient,
  admin,
})
