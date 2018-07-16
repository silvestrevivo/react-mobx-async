import {
  configure,
  action,
  observable,
  runInAction } from 'mobx'

configure({enforceActions: true})

class WeatherStore {
  @observable weatherData = {};

  @action loaderWeather = (city) => {
    fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`)
      .then(response => response.json())
      .then(data => {
        runInAction(() => {
          this.weatherData = data
          console.log('data', data)
        })
      })
  }
}

var store = new WeatherStore()

export default store
