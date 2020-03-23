import { createStore } from 'redux'

import rootReducer from './calendarReducer'

const initialState = {
  month: new Date(),
  reminders: {}
}

const store = createStore(rootReducer, initialState)

export default store