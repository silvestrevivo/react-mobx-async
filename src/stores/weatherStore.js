import {
  configure,
  observable,
  flow } from 'mobx'

configure({enforceActions: true})

class WeatherStore {
  @observable weatherData = {};

  loadWeatherGenerator = flow(function * (city) {
    const response = yield fetch(
      `https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`
    )
    const data = yield response.json()
    this.weatherData = data
    console.log('data', data)
  });
}

var store = new WeatherStore()

export default store
