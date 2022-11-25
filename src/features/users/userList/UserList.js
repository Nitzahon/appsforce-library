import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserState} from '../usersSlice'
import {show} from '../../modals/modalSlice'
import { useDispatch } from 'react-redux';
import UserTable from '../../../components/table/userTable/UserTable'
import './userList.css'
function UserList() {
  const dispatch = useDispatch();
    const userState = useSelector(getUserState)
    const [filter,setFilter] =useState('');
    const titleNameArr = ["Photo", "fullName", "email", "location", "ID"]

    const search=(user, ufilter)=>{
      let fln = user.name.title+" "+user.name.first+" "+user.name.last;
      let flc = `${user.location.street.name} ${user.location.street.number} ${user.location.city} ${user.location.country}`
      let arr = [fln, user.email, flc, user.uuid]
      return (arr.some(elm=> elm.toLowerCase().includes(ufilter.toLowerCase())))
    }

  return (
    <div className="container-fluid users-grid-container">
             <div className='flexy'>
        <input type="text" placeholder='Filter...' onChange={(event)=>{setFilter(event.target.value)}}/>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => {
                    dispatch(show({ modalType: 'ADD_USER', modalProps: { editMode:false } }))

                }}>Add User</button>
       </div>
      <UserTable titleNameArr={titleNameArr} users={[...userState.users].filter(user=> search(user, filter))}/>
    </div>
  )
}

export default UserList