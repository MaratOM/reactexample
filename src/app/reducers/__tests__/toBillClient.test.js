import toBillClient from 'app/reducers/toBillClient'
import {FETCH_TO_BILL_CLIENT_SUCCESS} from 'app/actions/actionTypes'

it('handles actions of type FETCH_TO_BILL_CLIENT_SUCCESS', () => {
  const action = {
    type: FETCH_TO_BILL_CLIENT_SUCCESS,
    payload: {
      name: 'Иван',
      surname: 'Иванов'
    },
  }

  const newState = toBillClient({}, action)

  expect(newState.name).toEqual('Иван')
  expect(newState.surname).toEqual('Иванов')
})
