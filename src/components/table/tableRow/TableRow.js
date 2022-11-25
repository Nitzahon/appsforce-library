import React from 'react'
import { v4 as uuidv4 } from 'uuid';
// import ModalHeader from '../../popups/modal/header/ModalHeader';
// import userForm from '../../forms/userForm';
// import StatusSymbol from '../../widgets/StatusSymbol';
import "./tableRow.css"
// import ContactWithuserRequest from '../../forms/ContactWithuserRequest';
// import ModalHeaderGrid3 from '../../popups/modal/header/ModalHeaderGrid3';
// import useModal from '../../../stores/ModalContext';
// import TooltipCover from '../../widgets/tooltip/TooltipCover';
import { show } from '../../../features/modals/modalSlice';
import { useDispatch } from 'react-redux'

const TableRow = ({ user, userArr, keyName }) => {
    const dispatch = useDispatch()



    return (
        <div className='table-row block-box-shadow bk-white' key={keyName}>

            {/* <StatusSymbol status={user.status} /> */}
            <div><img src={user.picture} alt={`${user.name.first}`} 
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="/default.jpg";
              }}
            /></div>
            {userArr.map(content => <div key={uuidv4()} className='ta-center'>{content}</div>)}

            <div className='button-container'>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => {
                    dispatch(show({ modalType: 'DELETE_USER', modalProps: { uuid: user.uuid } }))

                }}>Remove User</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => {
                    dispatch(show({ modalType: 'USER_FORM', modalProps: {user: user, editMode: true } }))

                }}>Edit User</button>
            </div>
        </div>

    )
}
export default TableRow