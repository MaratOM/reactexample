import {passUrlParams, clearUrlParams} from 'app/actions/local'
import {PASS_URL_PARAMS, CLEAR_URL_PARAMS} from 'app/actions/actionTypes'

describe('passUrlParams action', () => {
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
    passUrlParams('?p=NYSM128&r=маникюр')(dispatch)
  })

  it('has correct type', () => {
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({type: PASS_URL_PARAMS})
    )
  })

  it('has correct payload', () => {
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({payload: '?p=NYSM128&r=маникюр'})
    )
  })
})

describe('clearUrlParams action', () => {
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
    clearUrlParams()(dispatch)
  })

  it('has correct type', () => {
    expect(dispatch).toBeCalledWith(
        expect.objectContaining({type: CLEAR_URL_PARAMS})
    )
  })

  it('has correct payload', () => {
    expect(dispatch).toBeCalledWith(
        expect.objectContaining({payload: null})
    )
  })
})
