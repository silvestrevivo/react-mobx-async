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
