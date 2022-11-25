
import React from 'react'
import { useDispatch } from 'react-redux';
import { hide } from '../../features/modals/modalSlice';
import { userRemoved } from '../../features/users/usersSlice';
import './confirmDeleteModal.css'
const ConfirmDeleteModal=({uuid})=> {
    const dispatch = useDispatch();
    return (
      <aside className='modal-container'>
        <div className='confirm-modal'>
          <h4>delete user from list?</h4>
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-danger confirm-btn'
              onClick={() => {
                
                dispatch(userRemoved({userUUID:uuid}));
                dispatch(hide({}));
              }}
            >
              confirm
            </button>
            <button
              type='button'
              className='btn btn-primary clear-btn'
              onClick={() => {
                dispatch(hide({}));
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </aside>
    );
}
export default ConfirmDeleteModal
