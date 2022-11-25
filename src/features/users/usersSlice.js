import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  users: [],
  status: 'idle',
  error: null,
}
const errors = {
  uuidExist: 'uuid already exists, go figure...',
  notFound: 'user not found'
}
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('https://randomuser.me/api/?results=10')
  response.data.results= await Promise.all([...response.data.results].map(result=>{
    return {
      name: result.name,
      email: result.email,
      picture: result.picture.medium,
      location: {
        street: result.location.street,
        city: result.location.city,
        country: result.location.country
      },
      uuid: ((result.id.name!=="" ||result.id.value) ? ((result.id.name||"")+(result.id.value.replace(/\s+/g, '-')||"")):result.login.uuid)
    }

  }))
  return response.data
})
// export const addNewUser = createAsyncThunk(
//   'user/addNewPost',
//   async (initialPost) => {
//     return initialPost
//   }
// )
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action) {
      const { newUser } = action.payload
      const userExists = state.users.findIndex((user) => user.uuid === newUser.uuid)
      if (userExists === -1) {
        state.users.push(newUser)
        state.status = 'idle'
        state.error = null;

      }
      else {
        state.status = 'error';
        state.error = errors.uuidExist;
      }
    },
    userRemoved(state, action) {
      const { userUUID } = action.payload
      const userExists = state.users.findIndex((user) => user.uuid === userUUID)
      if (userExists !== -1) {
        state.status = 'idle'
        state.users.splice(userExists, 1)
        state.error = null;

      }
      else {
        state.status = 'error'
        state.error = errors.notFound;
      }
    },
    userEdited(state, action) {
      const { userUUID, updatedUser } = action.payload
      const existingUser = state.users.find((user) => user.uuid === userUUID)
      if (existingUser) {
        state.status = 'idle'
        state.error = null;
        existingUser.name = updatedUser.name;
        existingUser.location = updatedUser.location;
        existingUser.email = updatedUser.email;

      }
      else {
        state.status = 'error'
        state.error = errors.notFound;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const { results } = action.payload
        state.status = 'idle';
        state.users = [...new Set([...state.users, ...results])]
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })
  },
})
export const { userAdded, userRemoved, userEdited } = usersSlice.actions

export default usersSlice.reducer

export const getUserState = (state) => state.users