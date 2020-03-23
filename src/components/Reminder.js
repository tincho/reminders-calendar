import React from 'react'
import { connect } from 'react-redux'
import { addReminder, editReminder } from '@/redux/actions'
import { daysBetween } from '@/util/dates'
import { getWeather } from '@/util/weather'

import SelectColor from '@/components/SelectColor'

const locale = navigator.language || navigator.userLanguage || 'en'
const noop = () => {}

const Reminder = ({ reminder, addReminder, editReminder, onSave = noop }) => {
  const [newReminder, setNewReminder] = React.useState(reminder)
  const [weather, setWeather] = React.useState()
  const [errors, setErrors] = React.useState([])
  const textRef = React.createRef()

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

  React.useEffect(() => {
    textRef.current.focus()
  })

  const validate = () => {
    const err = []
    try {
      if (!newReminder.text) {
        err.push('Invalid text')
      }
      if (newReminder.time && newReminder.time.length) {
        const timeRegex = /([0-9]{1,2})(?:\:([0-9]{2}))?/
        const match = timeRegex.exec(newReminder.time)
        if (!match || Number(match[1]) > 23 || Number(match[2]) > 59) {
          err.push('Invalid time')
        }
      }
    } catch(e) {
      err.push('Something failed')
    }
    return err
  }

  const onSubmit = e => {
    e.preventDefault()
    const err = validate()
    if (err.length) {
      setErrors(err)
      return
    }
    const action = editing ? editReminder : addReminder
    action({
      date: reminder.date,
      reminder: newReminder
    })
    setErrors([])
    onSave()
  }

  const setReminderValue = value => evt => {
    setErrors([])
    setNewReminder({ ...newReminder, [value]: evt.target.value })
  }

  return (
    <form className="reminder" onSubmit={onSubmit} action="#">
      <h2>
        {editing ? 'Edit reminder' : 'New reminder'}
      </h2>
      <legend>
        {new Date(reminder.date).toLocaleString(locale, { weekday: 'long', month: 'long', day: 'numeric' })}
      </legend>
      <small className="weather">
        {weather ? `Temp: ${weather.temp}°${weather.tempUnit} - ${weather.condition}` : ''}
      </small>
      <hr />
      {errors.map(err => <p style={{color: 'red'}}>{err}</p>)}
      <label htmlFor="">
        Text:
        <input ref={textRef} id="" type="text" value={newReminder.text} onChange={setReminderValue('text')} />
      </label>
      <label htmlFor="">
        Time:
        <input id="" type="text" value={newReminder.time} onChange={setReminderValue('time')} />
      </label>
      <label htmlFor="">
        City:
        <input id="" type="text" value={newReminder.city} onChange={setReminderValue('city')} />
      </label>
      <label htmlFor="">
        Color:
        <SelectColor current={newReminder.color} onSelect={color => setNewReminder({...newReminder, color})} />
      </label>

      <button type="submit">Save</button>
    </form>
  )
}

export default connect(null, {
  addReminder,
  editReminder
})(Reminder)