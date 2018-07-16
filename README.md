<div align="center">
  <img width="200" height="200"
    src="https://sandstorm.de/_Resources/Persistent/3285416e8503b2c8354c321bcd690cf550b8b2d3/React-Logo.svg">
  <a href="https://github.com/mobxjs/mobx">
    <img width="200" height="200"
      src="https://mobx.js.org/docs/mobx.png">
  </a>
  <h1>React MobX async</h1>
</div>

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
But the best option is running __generators__ to control de _async/await_ flow
of the data fetching:

```javascript
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
```

Here inside is possile to use __try/catch__ combined with __axios__ to catch data.
