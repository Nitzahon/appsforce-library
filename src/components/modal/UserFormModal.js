
import React, { useEffect, useState } from 'react'
import ModalFooterAddUser from './footer/ModalFooterAddUser';
import TextInput from '../inputs/TextInput';
import './userFormModal.css'
const UserFormModal = ({ user, editMode }) => {
  const [currentFormData, setCurrentFormData] = useState({});
  const [errorList, setErrorList] = useState([]);

  const handleInput = (id, val) => {
    //We can delete prev State ID if empty string here - for different error message logic
    setCurrentFormData((prevState) => ({ ...prevState, [id]: val }))
  }

  const errorLog = (errorList) => {
    setErrorList(errorList);
  }

  const getErrorMsg = (id) => {
    let errorMsg = [...errorList].filter(err => err.id === id)
    return (errorMsg[0]?errorMsg[0].msg:'')
  }
  
  useEffect(() => {
    if(editMode){
      setCurrentFormData((prevState) => ({ ...prevState, uuid: user.uuid }))
    }
  }, [])
  
  return (
    <aside className='modal-container'>
      <div className='user-modal'>
        <h4>{editMode ? "Edit" : "Add"} User</h4>

        <div className='form-container'>
          <div className='modal-row'>
            <TextInput reqMark={"*"} name={60} label={"Title"} id="title" handleInput={(id, val) => { handleInput(id, val) }} value={user?user.name.title:null} error={getErrorMsg("title")} />
            <TextInput reqMark={"*"} name={60} label={"First Name"} id="first" handleInput={(id, val) => { handleInput(id, val) }} value={user?user.name.first:null} error={getErrorMsg("first")} />
            <TextInput reqMark={"*"} name={60} label={"Last Name"} id="last" handleInput={(id, val) => { handleInput(id, val) }} value={user?user.name.last:null} error={getErrorMsg("last")} />
          </div>

          <div className='modal-row'>
            <TextInput reqMark={"*"} name={250} label={"E-mail"} id="email" handleInput={(id, val) => { handleInput(id, val) }} value={user?user.email:null} error={getErrorMsg("email")}  />
            <TextInput reqMark={"*"} name={250} label={"Street Name"} id="streetName" handleInput={(id, val) => { handleInput(id, val) }} value={user?user.location.street.name:null} error={getErrorMsg("streetName")} />
            <TextInput reqMark={"*"} name={250} label={"Street Number"} id="streetNumber" handleInput={(id, val) => { handleInput(id, val) }} value={user?user.location.street.number:null} error={getErrorMsg("streetNumber")} />

          </div>

          <div className='modal-row'>
          <TextInput reqMark={"*"} name={400} label={"City"} id="city" handleInput={(id, val) => { handleInput(id, val) }} value={user?user.location.city:null} error={getErrorMsg("city")} />
          <TextInput reqMark={"*"} name={400} label={"Country"} id="country" handleInput={(id, val) => { handleInput(id, val) }} value={user?user.location.country:null} error={getErrorMsg("country")} />
          <TextInput               name={400} label={"Picture (URL)"} id="picture" handleInput={(id, val) => { handleInput(id, val) }} value={user?user.picture:null} error={getErrorMsg("picture")} editMode={editMode}/>

          </div>


        </div>
        <ModalFooterAddUser btnText={editMode ? "Save " : "Add "} emData={currentFormData} failList={(errorList) => { errorLog(errorList); }} editMode={editMode} btnDltText={"Cancel"} user={user} />

      </div>
    </aside>
  );
}
export default UserFormModal
