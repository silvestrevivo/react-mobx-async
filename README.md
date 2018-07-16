# react-mobx-async
Explanation of different approaches in MobX about async/await for fetching data. A first very simple version would be something like this:

```javascript
import { action, observable } from 'mobx'

class WeatherStore {
  @observable weatherData = {};

  @action loaderWeather = (city) => {
    fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`)
      .then(response => response.json())
      .then(data => {
        this.weatherData = data
        console.log('data', data)
      })
  }
}

var store = new WeatherStore()

export default store
```
In MobX4, when we use __enforceActions: true__ we have to take out the change of
the _observable_ from the promise's callback:

```javascript
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
```

Other solution will be using runInAction() inside of the promises:

```javascript
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
```
