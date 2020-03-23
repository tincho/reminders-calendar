import { createStore } from 'redux'
import rootReducer from '@/redux/calendarReducer'
const reminders = {}

const initialState = {
  month: new Date(),
  reminders
}

const store = createStore(rootReducer, initialState)

export default store