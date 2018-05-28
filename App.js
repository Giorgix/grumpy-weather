import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import RouterNav from './components/RouterNav'

import { reducer } from './redux/locationsRedux'
const store = createStore(reducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterNav />
      </Provider>
    )
  }
}
