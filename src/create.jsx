import ReactDOM from 'react-dom'
import React from 'react'
import { hot } from 'react-hot-loader'

export default (Dom) => {
  const Root = document.getElementById('root')
  const App = hot(module)(Dom)
  ReactDOM.render(<App />, Root)
}
