import React from 'react'
import { connect } from 'react-redux'
import { prevMonth, nextMonth } from '../redux/actions'
import Month from './Month'

const Calendar = ({ month, nextMonth, prevMonth }) => {
  const year = month.getFullYear()
  const monthNumber = month.getMonth()
  const monthName = month.toLocaleDateString('es', { month: 'long' })

  const title = <div style={{ display: 'flex', justifyContent: 'space-between'}}>
    <button onClick={() => prevMonth(month)}>Prev</button>
    <span style={{textTransform: 'capitalize' }}>{`${monthName} ${year}`}</span>
    <button onClick={() => nextMonth(month)}>Next</button>
  </div>

  return (
    <div id="container">
      {title}
      <Month year={year} month={monthNumber} />
    </div>
  );
}

const mapStateToProps = state => ({
  month: state.month
})

export default connect(
  mapStateToProps,
  {
    prevMonth,
    nextMonth
  }
)(Calendar)
