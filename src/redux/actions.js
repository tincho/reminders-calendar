const uniqueId = () => Math.random().toString(36).substr(2, 9)

export const PREV_MONTH = 'calendar/PREV_MONTH'
export const NEXT_MONTH = 'calendar/NEXT_MONTH'
export const ADD_REMINDER = 'calendar/ADD_REMINDER'
export const EDIT_REMINDER = 'calendar/EDIT_REMINDER'
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

  return {
    type: EDIT_REMINDER,
    dayPath: `reminders.${year}.${month}.${day}`,
    reminder
  }
}