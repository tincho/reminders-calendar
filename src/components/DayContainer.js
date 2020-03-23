import get from 'lodash/fp/getOr'
import { connect } from 'react-redux'
import { addReminder, editReminder } from '../redux/actions'

const mapStateToProps = (state, { date }) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return {
    outOfMonth: month !== state.month.getMonth(),
    reminders: get([], `reminders.${year}.${month}.${day}`, state)
  }
}

const mapDispatchToProps = {
  addReminder,
  editReminder
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)

