import get from 'lodash/fp/getOr'
import set from 'lodash/fp/setWith'
import { PREV_MONTH, NEXT_MONTH, ADD_REMINDER, EDIT_REMINDER, DELETE_REMINDER, CLEAN_REMINDERS } from '@/redux/actions'

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
    return set(Object, dayPath, [...day, reminder], state)
  },
  [EDIT_REMINDER]: (state, { dayPath, reminder }) => {
    const day = get([], dayPath, state)
    const prevIndex = day.findIndex(r => r.id === reminder.id)
    // it shouldnt happen that the reminder does not exist, 
    // but anyway lets make it failproof
    if (prevIndex === -1) {
      return state
    }
    return set(Object, `${dayPath}[${prevIndex}]`, reminder, state)
  },
  [DELETE_REMINDER]: (state, { dayPath, id }) => {
    const day = get([], dayPath, state)
    return set(Object, dayPath, day.filter(item => item.id !== id), state)
  },
  [CLEAN_REMINDERS]: (state, { dayPath }) => {
    const day = get([], dayPath, state)
    return set(Object, dayPath, [], state)
  }
}


const reducer = (state, action) => get(identity, action.type, byAction)(state, action)

export default reducer
