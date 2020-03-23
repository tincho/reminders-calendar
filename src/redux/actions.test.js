import store from './store'
import { ADD_REMINDER, addReminder, editReminder, EDIT_REMINDER } from './actions'

describe('actions creators and reducers', () => {
  it('addReminder', done => {
    const action1 = addReminder({
      date: new Date('2021-08-14T00:00'),
      reminder: {
        text: 'celebrate covid19 survival',
        city: 'San Francisco'
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
        text: 'wash my hands',
        city: 'Los Angeles'
      }
    })
    store.dispatch(action1)
    store.dispatch(action2)
  })

  it('editReminder', done => {
    // warning: destruct operator abusive usage x)
    const { reminders: { 2021: { 7: { 14: [rem] } } } } = store.getState()
    const action = editReminder({
      reminder: {
        ...rem,
        city: 'Porto Alegre'
      }
    })

    expect(action.type).toBe(EDIT_REMINDER)
    expect(action.dayPath).toBe('reminders.2021.7.14')
    expect(action.reminder.city).toBe('Porto Alegre')

    store.subscribe(() => {
      const { reminders: { 2021: { 7: { 14: [editedReminder] } } } } = store.getState()
      expect(editedReminder.city).toBe('Porto Alegre')
      done()
    })
    store.dispatch(action)
  })

  it('max text length 30 chars', () => {
    const add = addReminder({
      date: new Date(),
      reminder: {
        text: 'confinement, day 5: still have plenty of food. zombies have not arrived yet'
      }
    })
    expect(add.reminder.text).toBe('confinement, day 5: still have')

    const edit = editReminder({
      reminder: {
        text: 'confinement, day 6: ran out of food'
      }
    })
    expect(edit.reminder.text).toBe('confinement, day 6: ran out of')
  })
})