import salons from 'app/reducers/salons'
import {FETCH_SALONS_FILTER_LIST_SUCCESS} from 'app/actions/actionTypes'

it('handles actions of type FETCH_SALONS_FILTER_LIST_SUCCESS', () => {
  const action = {
    type: FETCH_SALONS_FILTER_LIST_SUCCESS,
    payload: [
      {
        sid: 1,
        name: 'Салон 1',
        metro: [
          'Варшавская',
        ],
      },
      {
        sid: 2,
        name: 'Салон 2',
        metro: [
          'Парк культуры',
          'Октябрьская',
        ],
      },
      {
        sid: 3,
        name: 'Салон 3',
        metro: [
          'Дмитровская',
        ],
      },
    ]
  }

  const newState = salons([], action)

  expect(newState.length).toEqual(3)
  expect(newState[1].metro.length).toEqual(2)
  expect(newState[2].sid).toEqual(3)
})
