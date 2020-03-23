import get from 'lodash/fp/getOr'

export const getWeather = (city, pickDay) => {
  // HEADS UP
  // as this project is only a demo
  // we are sending the request from the frontend, including potentially sensitive data (API Key)
  // this shouldn't be an issue
  // at worst, if exploited, my free account in weatherbit will be locked
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=43d788ce256d446288f4443a81c5eda3`
  return fetch(url).then(
    res => res.json()
  ).then(res => {
    const day = get({}, `data[${pickDay}]`, res)
    const temp = get('', 'temp', day)
    const tempUnit = 'C'
    const condition = get('', 'weather.description', day)
    const iconCode = get('', 'weather.icon', day)
    return {
      rh: day.rh,
      temp,
      tempUnit,
      condition,
      icon: `https://www.weatherbit.io/static/img/icons/${iconCode}.png`
    }
  })
}