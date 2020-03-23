import get from 'lodash/fp/getOr'
import { connect } from 'react-redux'
import { cleanReminders } from '@/redux/actions'

const mapStateToProps = (state, { date }) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return {
    outOfMonth: month !== state.month.getMonth(),
    reminders: get([], `reminders.${year}.${month}.${day}`, state).sort((a, b) => {
      if (!a.time) {
        return !b.time ? 0 : 1
      }
      if (!b.time) {
        return -1
      }
      const aStamp = new Date(`1970-01-01T${a.time}Z`).getTime()
      const bStamp = new Date(`1970-01-01T${b.time}Z`).getTime()
      return aStamp - bStamp
    })
  }
}

export default connect(
  mapStateToProps,
  { cleanReminders }
)

