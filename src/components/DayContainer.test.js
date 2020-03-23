import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import enhancer from './DayContainer'

const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
const day = today.getDate()
const todayReminders = [{
  id: 3,
  text: 'foo',
  time: false
},{
  id: 2,
  text: 'test',
  time: '23:00'
}, {
  id: 14,
  text: 'foo',
  time: ''
}, {
  id: 1,
  text: 'test',
  time: '01:00'
}]
const store = createStore(state => state, {
  month: today,
  reminders: {
    [year]: {
      [month]: {
        [day]: todayReminders
      }
    }
  }
})


describe('<Day/> connect() enhancer', () => {
  it('should pass month, outOfMonth and reminders props', done => {
    const Comp = enhancer(({ outOfMonth, reminders }) => {
      expect(outOfMonth).toBe(false)
      expect(reminders.length).toBe(todayReminders.length)
      done()
      return null
    })
    const div = document.createElement('div')
    ReactDOM.render((<Provider store={store}>
      <Comp date={new Date()} />
    </Provider>), div)
  })

  it('should detect outOfMonth', done => {
    const Comp = enhancer(({ outOfMonth }) => {
      expect(outOfMonth).toBe(true)
      done()
      return null
    })
    const aDateNextMonth = new Date()
    aDateNextMonth.setMonth(aDateNextMonth.getMonth() + 1)
    const div = document.createElement('div')
    ReactDOM.render((<Provider store={store}>
      <Comp date={aDateNextMonth} />
    </Provider>), div)
  })

  it('should sort reminders by time, push to the end those without', done => {
    const Comp = enhancer(({ reminders }) => {
      const [first, second] = reminders
      expect(first.id).toBe(1)
      expect(second.id).toBe(2)
      done()
      return null
    })
    const div = document.createElement('div')
    ReactDOM.render((<Provider store={store}>
      <Comp date={new Date()} />
    </Provider>), div)
  })
})
