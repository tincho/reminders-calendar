import get from 'lodash/get'
import { PREV_MONTH, NEXT_MONTH } from './actions'

const identity = v => v

const setMonth = (state, { month }) => {
  return {
    ...state,
    month
  }
}

const byAction = {
  [PREV_MONTH]: setMonth,
  [NEXT_MONTH]: setMonth
}


const reducer = (state, action) => get(byAction, action.type, identity)(state, action)

export default reducer