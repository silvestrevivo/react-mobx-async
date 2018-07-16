import React from 'react'
import ReactDOM from 'react-dom'
import '../assets/sass/style.scss'
import App from './components/app'

import { Provider } from 'mobx-react'
import store from './stores/weatherStore'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
