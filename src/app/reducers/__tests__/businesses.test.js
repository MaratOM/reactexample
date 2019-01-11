import businesses from 'app/reducers/businesses'
import {FETCH_BUSINESSES_LIST_SUCCESS} from 'app/actions/actionTypes'

it('handles actions of type FETCH_BUSINESSES_LIST_SUCCESS', () => {
  const action = {
    type: FETCH_BUSINESSES_LIST_SUCCESS,
    payload: [
      'Business 1',
      'Business 2',
      'Business 3',
    ]
  }

  const newState = businesses([], action)

  expect(newState).toEqual([
    'Business 1',
    'Business 2',
    'Business 3',
  ])
})
