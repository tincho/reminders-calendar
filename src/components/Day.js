import React from 'react'
import classnames from 'classnames'

import enhance from './DayContainer'

const today = new Date()
const isToday = date => 
  date.getDate() === today.getDate()
  && date.getMonth() === today.getMonth()
  && date.getFullYear() === today.getFullYear()

const Day = ({ date, outOfMonth, events }) => {

  const showEvents = () => {
    console.log(events)
  }

  return <td 
    className={classnames('day', {
      outOfMonth,
      today: isToday(date)
    })}>
      <span className="number">{date.getDate()}</span>
      {events.length ? <button onClick={showEvents}>{events.length}</button> : ''}
  </td>
}

export default enhance(Day)
