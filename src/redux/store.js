import { createStore } from 'redux'
import rootReducer from '@/redux/calendarReducer'
import set from 'lodash/fp/setWith'
const reminders = set(Object, '2020.2.23', [{
  id: 'existe',
  date: new Date(),
  text: 'hello',
  time: '20:14',
  city: 'Miami',
  color: '#cebaba'
}, {
  id: 'existe2',
  date: new Date(),
  text: 'test mas largo',
  time: '21:14',
  city: 'Miami',
  color: '#ffabab'
}, {
  id: '4wras',
  date: new Date(),
  text: 'lele',
  time: '16:20',
  city: 'Katar',
  color: '#0aff0a'
}], {}) 

// const reminders = {}

const initialState = {
  month: new Date(),
  reminders
}

const store = createStore(rootReducer, initialState)

export default store