import { configure, action, observable } from 'mobx'

configure({enforceActions: true})

class WeatherStore {
  @observable weatherData = {};

  @action loaderWeather = (city) => {
    fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`)
      .then(response => response.json())
      .then(data => {
        this.setWeather(data)
        console.log('data', data)
      })
  }

  setWeather = data => {
    this.weatherData = data
  }
}

var store = new WeatherStore()

export default store
