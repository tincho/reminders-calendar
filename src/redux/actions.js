const uniqueId = () => Math.random().toString(36).substr(2, 9)

export const PREV_MONTH = 'calendar/PREV_MONTH'
export const NEXT_MONTH = 'calendar/NEXT_MONTH'
export const ADD_REMINDER = 'calendar/ADD_REMINDER'
export const EDIT_REMINDER = 'calendar/EDIT_REMINDER'
export const DELETE_REMINDER = 'calendar/EDIT_REMINDER'
export const CLEAN_REMINDERS = 'calendar/CLEAN_REMINDERS'

export const prevMonth = currentMonth => {
  const month = new Date(currentMonth)
  month.setMonth(currentMonth.getMonth() - 1)
  return { type: PREV_MONTH, month }
}

export const nextMonth = currentMonth => {
  const month = new Date(currentMonth)
  month.setMonth(currentMonth.getMonth() + 1)
  return { type: NEXT_MONTH, month }
}

export const addReminder = ({ date = new Date(), reminder }) => {
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth()
  const day = new Date(date).getDate()

  const reminderObj = typeof reminder !== 'object' ? {
    text: reminder
  } : reminder

  if (reminderObj.time && !/:/g.test(reminderObj.time)) {
    reminderObj.time = reminderObj.time + ':00'
  }

  return {
    type: ADD_REMINDER,
    dayPath: `reminders.${year}.${month}.${day}`,
    reminder: {
      id: uniqueId(),
      date: new Date(date).toISOString(),
      ...reminderObj
    }
  }
}

export const editReminder = ({ reminder }) => {
  const { date } = reminder
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth()
  const day = new Date(date).getDate()

  if (reminder.time && !/:/g.test(reminder.time)) {
    reminder.time = reminder.time + ':00'
  }

  return {
    type: EDIT_REMINDER,
    dayPath: `reminders.${year}.${month}.${day}`,
    reminder
  }
}

export const deleteReminder = ({ date, id }) => {
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth()
  const day = new Date(date).getDate()
  return {
    type: DELETE_REMINDER,
    dayPath: `reminders.${year}.${month}.${day}`,
    id
  }
}

export const cleanReminders = date => {
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth()
  const day = new Date(date).getDate()
  return {
    type: CLEAN_REMINDERS,
    dayPath: `reminders.${year}.${month}.${day}`
  }
}
