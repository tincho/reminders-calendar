import React from 'react'
import { connect } from 'react-redux'
import { prevMonth, nextMonth } from '@/redux/actions'
import Month from '@/components/Month'

const Calendar = ({ month, nextMonth, prevMonth }) => {
  const year = month.getFullYear()
  const monthNumber = month.getMonth()
  const monthName = month.toLocaleDateString('es', { month: 'long' })

  const title = (
    <header style={{ display: 'flex', justifyContent: 'space-between'}}>
      <button
        className="navigate prevMonth"
        onClick={() => prevMonth(month)}>
          &laquo;
      </button>
      <h1 style={{textTransform: 'capitalize' }}>{`${monthName} ${year}`}</h1>
      <button
        className="navigate nextMonth"
        onClick={() => nextMonth(month)}>
          &raquo;
      </button>
    </header>
  )

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
