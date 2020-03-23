import React from 'react'
import { connect } from 'react-redux'
import { addReminder, editReminder } from '@/redux/actions'
import { daysBetween } from '@/util/dates'
import { getWeather } from '@/util/weather'

const locale = navigator.language || navigator.userLanguage || 'en'
const noop = () => {}

const Reminder = ({ reminder, addReminder, editReminder, onSave = noop }) => {
  const [newReminder, setNewReminder] = React.useState(reminder)
  const [weather, setWeather] = React.useState()

  const editing = reminder.id

  React.useEffect(() => {
    const distance = daysBetween(new Date(reminder.date))
    if (distance < 0) {
      return
    }
    if (!editing || !reminder.city) {
      return
    }
    getWeather(reminder.city, reminder.date).then(forecast => {
      setWeather(forecast)
    })
  })

  const onSubmit = (e) => {
    e.preventDefault()
    const action = editing ? editReminder : addReminder
    action({
      date: reminder.date,
      reminder: newReminder
    })
    onSave()
  }

  const setReminderValue = value => evt => setNewReminder({ ...newReminder, [value]: evt.target.value })

  return (
    <form onSubmit={onSubmit} action="#">
      <legend>
        {new Date(reminder.date).toLocaleString(locale, { weekday: 'long', month: 'long', day: 'numeric' })}
      </legend>
      <small className="weather">
        {weather ? `Temp: ${weather.temp}°${weather.tempUnit} - ${weather.condition}` : ''}
      </small>
      <hr />
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