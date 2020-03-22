import React, { useState } from 'react'
import Month from './Month'

const Calendar = () => {
  const [month, setMonth] = useState(new Date())
  const prevMonth = () => {
    const newMonth = new Date(month)
    newMonth.setMonth(month.getMonth() - 1)
    setMonth(newMonth)
  }
  const nextMonth = () => {
    const newMonth = new Date(month)
    newMonth.setMonth(month.getMonth() + 1)
    setMonth(newMonth)
  }

    const year = month.getFullYear()
    const monthNumber = month.getMonth()
    const monthName = month.toLocaleDateString('es', { month: 'long' })

    const title = <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <button onClick={prevMonth}>Prev</button>
      <span style={{textTransform: 'capitalize' }}>{`${monthName} ${year}`}</span>
      <button onClick={nextMonth}>Next</button>
    </div>
    return (
      <div id="container">
        {title}
        <Month year={year} month={monthNumber} />
      </div>
    );
}

export default Calendar