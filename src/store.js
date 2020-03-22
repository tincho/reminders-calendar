import { createStore } from 'redux'

const rootReducer = state => state

const initialState = {
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
          }
        }]
      }
    }
  }
}

const store = createStore(rootReducer, initialState)

export default store