import store from './store'
import { ADD_REMINDER, addReminder } from './actions'

describe('actions creators and reducers', () => {
  it('addReminder', done => {
    const action1 = addReminder({
      date: new Date('2021-08-14T00:00'),
      reminder: {
        text: 'celebrate covid19 survival'
      }
    })

    expect(action1.type).toBe(ADD_REMINDER)
    expect(action1.dayPath).toBe('reminders.2021.7.14')

    store.subscribe(() => {
      const thatDayReminders = store.getState().reminders['2021']['7']['14']
      if (thatDayReminders.length !== 2) return
      expect(thatDayReminders.some(rem => rem.id === action1.reminder.id)).toBe(true)
      done()
    })
    
    const action2 = addReminder({
      date: new Date('2021-08-14T00:00'),
      reminder: {
        text: 'wash my hands'
      }
    })
    store.dispatch(action1)
    store.dispatch(action2)
  })
})