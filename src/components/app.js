import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'

class App extends Component {
  static propTypes = {
    store: PropTypes.object
  }

  componentDidMount () {
    this.props.store.loaderWeather('Amsterdam')
  }

  render () {
    console.log('store', this.props.store)
    return (
      <div className="container">
        Console displays the json object
      </div>
    )
  }
}

export default (inject('store'))(observer(hot(module)(App)))
