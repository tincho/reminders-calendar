import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import get from 'lodash.get'

const today = new Date()
const isToday = date => 
  date.getDate() === today.getDate()
  && date.getMonth() === today.getMonth()
  && date.getFullYear() === today.getFullYear()

const Day = ({ date, outOfMonth, events }) => {

  const showEvents = () => {
    console.log(events)
  }

  return <td 
    className={classnames('day', {
      outOfMonth,
      today: isToday(date)
    })}>
      <span className="number">{date.getDate()}</span>
      {events.length ? <button onClick={showEvents}>{events.length}</button> : ''}
  </td>
}

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
)(Day)
