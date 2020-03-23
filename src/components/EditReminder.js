import React from 'react'
import Modal from 'react-modal'
import Reminder from '@/components/Reminder'

const EditReminder = ({ reminder }) => {
  const [open, setOpen] = React.useState(false)
  const closeModal = () => setOpen(false)
  return (
    <span key={reminder.id}>
      <button
        type="button"
        style={{ backgroundColor: reminder.color, textAlign: 'left', margin: '0 3px 3px 0', fontSize: '0.7rem' }}
        onClick={() => setOpen(!open)}>
          {reminder.time ? reminder.time : ''}
          {' '}
          {reminder.text}
        </button>
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          contentLabel="Minimal Modal Example"
          shouldCloseOnOverlayClick={true}>
          <header>
            <button onClick={closeModal}>&times;</button>
          </header>
          <Reminder reminder={reminder} onSave={closeModal} />
        </Modal>
    </span>)
}

export default EditReminder