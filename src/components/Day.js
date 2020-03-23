import React from 'react'
import classnames from 'classnames'
import { isToday } from '../util/dates'
import enhance from './DayContainer'

const Day = ({ date, outOfMonth, reminders, addReminder }) => {

  const showReminders = () => {
    console.log(reminders)
  }

  return <td 
    className={classnames('day', {
      outOfMonth,
      today: isToday(date)
    })}>
      <span className="number">{date.getDate()}</span>
      {reminders.length ? <button onClick={showReminders}>{reminders.length}</button> : ''}
      <button onClick={() => {
        const reminder = prompt('title?')
        addReminder({ date, reminder })
      }}>+</button>
  </td>
}

export default enhance(Day)
