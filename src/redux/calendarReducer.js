import get from 'lodash/fp/getOr'
import set from 'lodash/fp/set'
import { PREV_MONTH, NEXT_MONTH, ADD_REMINDER } from './actions'

const identity = v => v

const setMonth = (state, { month }) => {
  return {
    ...state,
    month
  }
}

const byAction = {
  [PREV_MONTH]: setMonth,
  [NEXT_MONTH]: setMonth,
  [ADD_REMINDER]: (state, { dayPath, reminder }) => {
    const day = get([], dayPath, state)
    return set(dayPath, [...day, reminder], state)
  }
}


const reducer = (state, action) => get(identity, action.type, byAction)(state, action)

export default reducer
