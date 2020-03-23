import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { deleteReminder } from '@/redux/actions'
import Reminder from '@/components/Reminder'

const EditReminder = ({ reminder, remove }) => {
  const [open, setOpen] = React.useState(false)
  const closeModal = () => setOpen(false)
  return (
    <span key={reminder.id}>
      <button
        title="View/Edit"
        type="button"
        style={{ backgroundColor: reminder.color, textAlign: 'left', margin: '0 3px 3px 0', fontSize: '0.7rem' }}
        onClick={() => setOpen(!open)}>
        {reminder.time ? reminder.time : ''}
        {' '}
        {reminder.text}
      </button>
      <button
        title="Remove"
        type="button"
        style={{
          fontSize: '0.5rem',
          backgroundColor: 'crimson',
          padding: 2
        }}
        onClick={() => remove(reminder)}>
        &times;
      </button>
      <Modal
        ariaHideApp={false}
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

export default connect(null, {
  remove: deleteReminder
})(EditReminder)