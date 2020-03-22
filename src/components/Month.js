import React from 'react'

import { localizedWeekDays, makeCalendarRows } from '../util/dates'

import Day from './Day'

const Month = ({ year, month }) => {
  const dayNames = localizedWeekDays.map(dayName => (
    <th key={dayName} style={{ textTransform: "capitalize" }}>
      {dayName}
    </th>))
  
  const weeks = makeCalendarRows(year, month).map(row => 
    <tr key={row[0].getTime()}>
      {row.map(day => 
        <Day
          key={day.getTime()}
          date={day}
          outOfMonth={day.getMonth() !== Number(month)} />
      )}
    </tr>)

  return (
    <table className="month">
      <thead>
        <tr>
          {dayNames}
        </tr>
      </thead>
      <tbody>{weeks}</tbody>
    </table>
  );
}

export default Month
