// date utils


const chunkify = (chunkSize, src) => Array.from(
  { length: Math.ceil(src.length/chunkSize) },
  (_, i) => src.slice(i*chunkSize,i*chunkSize+chunkSize)
)

const plusDays = (days, date) => {
  const newDate = new Date(date)
  newDate.setDate(date.getDate() + days)
  return newDate
}

export const makeCalendarRows = (year, month) => {

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, Number(month) + 1, 0);

  const firstWeekDay = firstDay.getDay();
  const lastWeekDay = lastDay.getDay();

  // pull back first date to prev sunday
  const firstShowingDate = (firstWeekDay > 0)
    ? plusDays(-firstWeekDay, firstDay)
    : new Date(firstDay)

  // push last date to following saturday
  const lastShowingDate = (lastWeekDay < 6) 
    ? plusDays(6 - lastWeekDay, lastDay)
    : new Date(lastDay)

  // add all days that will be shown in an array
  const days = [
    firstShowingDate
  ]

  let i = 0;
  while (days.slice(-1).pop() < lastShowingDate) {
    days.push(plusDays(++i, firstShowingDate))
  }

  // then split the array in rows of 7 days
  return chunkify(7, days)
}


export const localizedWeekDays = (() => {
  const locale = navigator.language || navigator.userLanguage || "en";
  // create a sunday
  const d = new Date();
  const sunday = plusDays(-d.getDay(), d)
  const result = Array.from(
    { length: 7 }, 
    (_, i) => plusDays(i, sunday).toLocaleDateString(locale, { weekday: "long" })
  )
  return result;
})(); // iife

const today = new Date()
export const isToday = date => 
  date.getDate() === today.getDate()
  && date.getMonth() === today.getMonth()
  && date.getFullYear() === today.getFullYear()
