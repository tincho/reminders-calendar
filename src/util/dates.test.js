import { localizedWeekDays, makeCalendarRows } from './dates'

const months = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
}

describe('date utilities', () => {

  it('exports an array of week days', () => {
    expect(localizedWeekDays.length).toBe(7)
    expect(localizedWeekDays.every(item => typeof item === 'string')).toBe(true)
  })

  describe('calendar week rows', () => {

    it('february 2020 starts on a saturday but ends on saturday - show 5 rows', () => {
      const weeks = makeCalendarRows(2020, months.feb)

      // first showing day: january 26th
      const firstDay = weeks[0][0]
      expect(firstDay.getDate()).toBe(26)
      expect(firstDay.getMonth()).toBe(months.jan)

      // last showing day: february 29th
      const lastDay = weeks.slice(-1).pop().slice(-1).pop()
      expect(lastDay.getDate()).toBe(29)
      expect(lastDay.getMonth()).toBe(months.feb)

      // rows: 5
      expect(weeks.length).toBe(5)
    })


    it('march 2020 starts on a sunday but ends on tuesday - show 5 rows', () => {
      const weeks = makeCalendarRows(2020, months.mar)

      // first showing day: march 1st
      const firstDay = weeks[0][0]
      expect(firstDay.getDate()).toBe(1)
      expect(firstDay.getMonth()).toBe(months.mar)

      // last showing day: apr 4th
      const lastDay = weeks.slice(-1).pop().slice(-1).pop()
      expect(lastDay.getDate()).toBe(4)
      expect(lastDay.getMonth()).toBe(months.apr)

      // rows: 5
      expect(weeks.length).toBe(5)
    })



    it('may 2020 starts on a saturday but ends on saturday - show 6 rows', () => {
      const weeks = makeCalendarRows(2020, months.may)

      // first showing day: april 26th
      const firstDay = weeks[0][0]
      expect(firstDay.getDate()).toBe(26)
      expect(firstDay.getMonth()).toBe(months.apr)

      // last showing day: june 6th
      const lastDay = weeks.slice(-1).pop().slice(-1).pop()
      expect(lastDay.getDate()).toBe(6)
      expect(lastDay.getMonth()).toBe(months.jun)

      // rows: 6
      expect(weeks.length).toBe(6)
    })

  })
})
