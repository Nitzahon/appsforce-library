import React from 'react'
import UserList from './features/users/userList/UserList'
import ModalRoot from './components/modal/ModalRoot'
function App() {
  return (

    <div className='App'>
      <ModalRoot/>
      <UserList/>
    </div>
  )
}

export default App
