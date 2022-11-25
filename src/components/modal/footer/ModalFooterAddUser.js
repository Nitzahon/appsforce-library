import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hide } from '../../../features/modals/modalSlice';
import {userAdded, userEdited} from '../../../features/users/usersSlice'
import { v4 as uuidv4 } from 'uuid';
import { newUser } from '../../../constants/formKeys.json';
// import useToasts from '../../../popups/toasts/toasts';

import "./modalFooterAddUser.css";

const ModalFooterAddUser = ({  emData, failList,  editMode }) => {

  const dispatch = useDispatch();

  // const [uploadUsers, addUser] = useToasts();
  const [formState, setFormState] = useState(false)

  const isValidName=(str)=> {
    if (!str) {
      return false;
    }

    return str.length > 2;
  }
  const checkObjHasProperty=(keyNamaArr, dataObj)=> {
    let flag;

    if (typeof dataObj !== "object") {
      return false;
    }
    keyNamaArr.map((value) => {
      if (!dataObj.hasOwnProperty(value) || dataObj[value] === "") {
        flag = false;
        return;
      } else {
        flag = true;
      }
    })
    return flag;
  }
  const  isValidMail=(m)=> {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(m);
  } 
  const getNewEmpVal=(formKeys, emData)=> {
    let emArr = Object.keys(emData);
    let error = {}
    let errorList = []
    let testArr = Object.keys(formKeys).filter(item => !emArr.includes(item));
    let valid = true;
    if (testArr.length > 0) {
      testArr.forEach((id) => {
        valid = false;
        errorList.push({ msg: "Please fill out required feild", id });
      })
      // return { error: true, errorList };
    }

    if (!isValidName(emData["first"])) {
      errorList.push({ msg: "First name needs to be at least 3 characters long", id: "first" })
      valid = false;
    }
    if (!isValidName(emData["last"])) {
      errorList.push({ msg: "בטוח שהשם תקין?", id: "last" })
      valid = false;
    }

    if (!isValidMail(emData["email"])) {
      errorList.push({ msg: "Invalid e-mail", id: "email" })
      valid = false;
    }

    if (!valid) {
      return { error: true, errorList }
    }
    return emData;
  }
  const submitForm = () => {
    let sendForm = getNewEmpVal(newUser, emData);
    console.log(emData);
    if (!sendForm.error) {
          let data = {};
          data.name = {
            title: emData.title,
            first: emData.first,
            last: emData.last
          };
          data.email = emData.email;
          data.location= {
            street:{
              number:emData.streetNumber,
              name: emData.streetName
            },
            city: emData.city,
            counntry: emData.country
          };
          data.picture= (emData.picture && emData.picture!=="")? emData.picture: '/default.jpg'
          data.uuid= uuidv4();
          if(editMode){
            dispatch(userEdited({userUUID:emData.uuid , updatedUser:data }))
          }
          else{
            dispatch(userAdded({newUser:data}))
          }
          dispatch(hide());
    }
    else {
      failList(sendForm.errorList);
    }
  }

  useEffect(() => {
    setFormState(checkObjHasProperty(["title","first", "last", "email", "streetNumber", "streetName", "city", "country" ], emData))
  }, [emData])


  return (
    <div className="modal-row">

        <button className={`coverbtn modal-add-user-btn`} onClick={ (() => { submitForm() }) }>{editMode? "Save ":"Add "}User</button>
        <button className={`coverbtn modal-add-user-btn`} onClick={ () => {dispatch(hide()) }}>Cancel</button>

    </div>
  )
}
export default ModalFooterAddUser;