import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
// import { worker } from './api/server'

import { fetchUsers } from './features/users/usersSlice'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  // await worker.start({ onUnhandledRequest: 'bypass' })

  store.dispatch(fetchUsers())
  const container =document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
      )
}

start()
