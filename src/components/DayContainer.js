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
      const noA = !a.time || a.time === ''
      const noB = !b.time || b.time === ''
      if (noA) {
        return noB ? 0 : 1
      }
      if (noB) {
        return -1
      }
      const aDate = new Date(`1970-01-01T${a.time}Z`)
      const bDate = new Date(`1970-01-01T${b.time}Z`)
      return aDate.getTime() - bDate.getTime()
    })
  }
}

export default connect(
  mapStateToProps,
  { cleanReminders }
)

