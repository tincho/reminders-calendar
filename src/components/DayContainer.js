import { connect } from 'react-redux'
import get from 'lodash.get'

const mapStateToProps = (state, { date }) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return {
    events: get(state, `events.${year}.${month}.${day}`, [])
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)

