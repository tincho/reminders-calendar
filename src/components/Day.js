import React from 'react'
import classnames from 'classnames'
import { isToday } from '@/util/dates'
import Reminder from '@/components/Reminder'
import enhance from './DayContainer'

const Day = ({ date, outOfMonth, reminders }) => {

  const [open, setOpen] = React.useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  const showReminder = reminder => {
    openModal()
  }

  const addReminder = () => {
    openModal()
  }

  return <td 
    className={classnames('day', {
      outOfMonth,
      today: isToday(date)
    })}>
      <span className="number">{date.getDate()}</span>
      {reminders.map(reminder => (
        <>
        <button
          style={{ backgroundColor: reminder.color }}
          key={reminder.id}
          onClick={() => showReminder(reminder)}>
            *
          </button>
          {open && <Reminder reminder={reminder} />}
        </>
        )
      )}
      <button className="addReminder" onClick={addReminder}>+</button>
      {open && <Reminder reminder={{ date: date.toISOString() }} />}
  </td>
}

export default enhance(Day)
