export const getWeather = (city, date) => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      temp: 19,
      tempUnit: 'C',
      condition: 'rain'
    })
  }, 500)
})