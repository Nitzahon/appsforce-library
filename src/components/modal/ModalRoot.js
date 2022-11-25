// These are regular React components we will write soon
import React from 'react'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import UserFormModal from './UserFormModal'
import { useSelector } from 'react-redux'
import { getModalState } from '../../features/modals/modalSlice'
import './modalRoot.css'
// import ConfirmLogoutModal from './ConfirmLogoutModal'

const MODAL_COMPONENTS = {
  'DELETE_USER': ConfirmDeleteModal,
  'USER_FORM':UserFormModal,
//   'CONFIRM_LOGOUT': ConfirmLogoutModal,
  /* other modals */
}

const ModalRoot = () => {
    // const dispatch = useDispatch()
    const modalState = useSelector(getModalState)
    console.log(modalState);
  if (!modalState.modalType) {
    return null // after React v15 you can return null here
  }

  const SpecificModal = MODAL_COMPONENTS[modalState.modalType]
  return <SpecificModal {...modalState.modalProps} />
}

export default ModalRoot