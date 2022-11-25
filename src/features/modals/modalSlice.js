import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modalType: null,
  modalProps: {},
}


const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        show(state, action) {
            const {modalType, modalProps} = action.payload;
            state.modalType= modalType;
            state.modalProps=modalProps;
          },
          hide: () => initialState
    },

  })
  export const { show,hide } = modalSlice.actions

  export default modalSlice.reducer

export const getModalState = (state) => state.modal