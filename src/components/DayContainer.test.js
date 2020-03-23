import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import enhancer from './DayContainer'

const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
const day = today.getDate()
const store = createStore(state => state, {
  month: today,
  reminders: {
    [year]: {
      [month]: {
        [day]: [{
          id: 1,
          text: 'test'
        }]
      }
    }
  }
})


describe('<Day/> connect() enhancer', () => {
  it('should pass month, outOfMonth and reminders props', done => {
    const Comp = enhancer(({ outOfMonth, reminders }) => {
      expect(outOfMonth).toBe(false)
      expect(reminders.length).toBe(1)
      done()
      return null
    })
    const div = document.createElement('div')
    ReactDOM.render((<Provider store={store}>
      <Comp date={new Date()} />
    </Provider>), div)
  })
})
