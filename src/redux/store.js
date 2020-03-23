import { createStore } from 'redux'
import rootReducer from '@/redux/calendarReducer'
/* import set from 'lodash/fp/setWith'
const reminders = set(Object, '2020.2.23', [{
  id: 'existe',
  date: new Date(),
  text: 'hello',
  time: '20:14',
  city: 'Miami',
  color: '#cebaba'
}], {}) */

const reminders = {}

const initialState = {
  month: new Date(),
  reminders
}

const store = createStore(rootReducer, initialState)

export default store