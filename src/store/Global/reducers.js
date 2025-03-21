import {
  SET_DISABLED_SCROLL,
} from './types'

const initialState = {
  disabledScroll: false,
}

const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DISABLED_SCROLL:
      return {
        ...state,
        disabledScroll: action.payload,
      }
    default:
      return state
  }
}

export default GlobalReducer
