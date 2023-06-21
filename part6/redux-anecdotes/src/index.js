import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'

import filterReducer from './reducers/filterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: { anecdotes: anecdoteReducer, filter: filterReducer },
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// const root = ReactDOM.createRoot(document.getElementById('root'))

// const renderApp = () => {
//   root.render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )
// }

// renderApp()
// store.subscribe(renderApp, () => {
//   console.log(store)
// })
