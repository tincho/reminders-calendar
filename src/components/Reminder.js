import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { addReminder, editReminder } from '@/redux/actions'
import { daysBetween } from '@/util/dates'
import { getWeather } from '@/util/weather'

import SelectColor from '@/components/SelectColor'

const locale = navigator.language || navigator.userLanguage || 'en'
const noop = () => {}

const Reminder = ({ reminder, addReminder, editReminder, onSave = noop }) => {
  const [newReminder, setNewReminder] = React.useState(reminder)
  const [weather, setWeather] = React.useState({
    loaded: false,
    loading: false,
    data: {}
  })
  const [errors, setErrors] = React.useState([])

  const editing = reminder.id
  const date = new Date(reminder.date)
  const daysDistance = daysBetween(date)
  
  React.useEffect(() => {
    
    if (daysDistance < 0 || daysDistance > 15) {
      return
    }
    if (!editing || !reminder.city) {
      return
    }
    if (weather.loaded || weather.loading) {
      return
    }
    setWeather({
      ...weather,
      loading: true
    })
    getWeather(reminder.city, daysDistance).then(data => {
      setWeather({
        loading: false,
        loaded: true,
        data
      })
    })
  }, [editing, daysDistance, weather, reminder.date, reminder.city])

  const timeRegex = '^([0-9]{1,2})(:([0-9]{2}))?$'
  const validate = () => {
    const err = []
    try {
      if (!newReminder.text || newReminder.text.length > 30) {
        err.push('Invalid text')
      }
      if (newReminder.time && newReminder.time.length) {
        const match = new RegExp(timeRegex).exec(newReminder.time)
        if (!match 
            || Number(match[1]) > 23 
            || Number(match[3]) > 59) {
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

  const idPrefix = date.getTime()

  return (
    <form className="reminder" onSubmit={onSubmit} action="#">
      <h2>
        {editing ? 'Edit reminder' : 'New reminder'}
      </h2>
      <h3>
        {date.toLocaleString(locale, { weekday: 'long', month: 'long', day: 'numeric' })}
      </h3>
      <div className={classnames('weather', { loaded: weather.loaded })}>
      {weather.loaded ? (
        <>
          <strong>Weather forecast:</strong>
          <p>Temp: {weather.data.temp}°{weather.data.tempUnit} &mdash; Hum: {weather.data.rh}%</p>
          <p>{weather.data.condition}</p>
          <img src={weather.data.icon} loading="lazy" alt={weather.data.condition} />
        </>
      ) : weather.loading ? 'Loading...' : '' }
      </div>

      <hr />
      {errors.map((err,i) => <p key={i} style={{color: 'red'}}>{err}</p>)}
      <label htmlFor={`#${idPrefix}-text`}>
        Text:
        <input
          autoComplete="off"
          autoFocus
          maxLength="30"
          id={`${idPrefix}-text`}
          type="text"
          value={newReminder.text || ''}
          onChange={setReminderValue('text')} />
      </label>
      <label htmlFor={`#${idPrefix}-time`}>
        Time: 
        <br/><small style={{color: 'gray'}}>(format <code>HH:MM</code>)</small>
        <input
          id={`${idPrefix}-time`}
          pattern={timeRegex}
          autoComplete="off"
          maxLength="5"
          type="text"
          value={newReminder.time || ''}
          onChange={setReminderValue('time')} />
      </label>
      <label htmlFor={`#${idPrefix}-city`}>
        City:
        <input
          id={`${idPrefix}-city`}
          type="text"
          value={newReminder.city || ''}
          onChange={setReminderValue('city')} />
      </label>
      <label htmlFor={`#${idPrefix}-color`}>
        Color:
        <SelectColor
          current={newReminder.color}
          onSelect={color => setNewReminder({...newReminder, color})} />
      </label>

      <button type="submit">Save</button>
    </form>
  )
}

export default connect(null, {
  addReminder,
  editReminder
})(Reminder)