import { configureStore } from '@reduxjs/toolkit'

import usersReducer from '../features/users/usersSlice'
import modalReducer from '../features/modals/modalSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    modal: modalReducer
  },
})
