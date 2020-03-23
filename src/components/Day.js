import React from 'react'
import classnames from 'classnames'
import Modal from 'react-modal'

import { isToday } from '@/util/dates'
import Reminder from '@/components/Reminder'
import EditReminder from '@/components/EditReminder'
import enhance from './DayContainer'

const Day = ({ date, outOfMonth, reminders }) => {

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
      <button className="addReminder" onClick={openModal}>+</button>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}>
        <header>
          <button onClick={closeModal}>&times;</button>
        </header>
        <Reminder reminder={{ date: new Date() }} onSave={closeModal} />
      </Modal>
  </td>
}

export default enhance(Day)
