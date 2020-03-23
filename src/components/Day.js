import React from 'react'
import classnames from 'classnames'
import Modal from 'react-modal'

import { isToday } from '@/util/dates'
import Reminder from '@/components/Reminder'
import EditReminder from '@/components/EditReminder'
import enhance from './DayContainer'

const Day = ({ date, outOfMonth, reminders, cleanReminders }) => {

  const [open, setOpen] = React.useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return <td 
    className={classnames('day', {
      outOfMonth,
      today: isToday(date)
    })}>
      <span className="number">{date.getDate()}</span>
      {reminders.map(reminder => <EditReminder reminder={reminder} key={reminder.id} />)}
      <button title="Add Reminder" className="addReminder" onClick={openModal}>+</button>
      {reminders.length > 1 && <button title="Remove ALL" className="cleanReminders" onClick={() => {
        if (window.confirm) {
          const sure = window.confirm('Remove all reminders for this day. Are you sure?')
          if (!sure) return
        }
        cleanReminders(date)
      }}>&times;</button>}
      <Modal
        ariaHideApp={false}
        isOpen={open}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}>
        <header>
          <button onClick={closeModal}>&times;</button>
        </header>
        <Reminder reminder={{ date: new Date(date) }} onSave={closeModal} />
      </Modal>
  </td>
}

export default enhance(Day)
