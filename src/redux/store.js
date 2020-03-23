import { createStore } from 'redux'

import rootReducer from './calendarReducer'

const initialState = {
  month: new Date(),
  events: {
    2020: {
      2: {
        1: [{
          time: '20:00',
          text: 'hello',
          city: {
            code: 'MDQ',
            name: 'Mar del Plata',
            latLng: []
          },
          color: '#0f0f0f'
        }]
      }
    }
  }
}

const store = createStore(rootReducer, initialState)

export default store