import React from 'react'
import { connect } from 'react-redux'
import { addReminder, editReminder } from '@/redux/actions'

const locale = navigator.language || navigator.userLanguage || 'en'

const Reminder = ({ reminder, addReminder, editReminder }) => {
  const [newReminder, setNewReminder] = React.useState(reminder)

  const onSubmit = (e) => {
    e.preventDefault()
    const action = reminder.id ? editReminder : addReminder
    action({
      date: reminder.date,
      reminder: newReminder
    })
  }

  const setReminderValue = value => evt => setNewReminder({ ...newReminder, [value]: evt.target.value })

  return (
    <form onSubmit={onSubmit} action="#">
      {new Date(reminder.date).toLocaleString(locale, { weekday: 'long', month: 'long', day: 'numeric' })}
      <label htmlFor="">
        text
        <input id="" type="text" value={newReminder.text} onChange={setReminderValue('text')} />
      </label>
      <label htmlFor="">
        time
        <input id="" type="text" value={newReminder.time} onChange={setReminderValue('time')} />
      </label>
      <label htmlFor="">
        city
        <input id="" type="text" value={newReminder.city} onChange={setReminderValue('city')} />
      </label>
      <label htmlFor="">
        color
        <input id="" type="text" value={newReminder.color} onChange={setReminderValue('color')} />
      </label>

      <button type="submit">Save</button>
    </form>
  )
}

export default connect(null, {
  addReminder,
  editReminder
})(Reminder)