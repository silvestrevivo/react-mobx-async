import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import JSONPretty from 'react-json-pretty'

class App extends Component {
  state = {
    weatherData: {}
  }

  componentDidMount () {
    fetch('https://abnormal-weather-api.herokuapp.com/cities/search?city=Amsterdam')
      .then(response => response.json())
      .then(data => {
        this.setState({
          weatherData: data
        })
        console.log(data)
      })
  }

  render () {
    return (
      <div className="container">
        <JSONPretty json={this.state.weatherData} />
      </div>
    )
  }
}

export default hot(module)(App)
