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
