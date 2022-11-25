import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// import utl from '../../../common/utl';
import TableRow from '../tableRow/TableRow';
import TableTitles from '../tableTitle/TableTitles';
import "./userTable.css"

const UserTable = ({ titleNameArr, users }) => {

   const getUserInfo4Table=(user)=> {


        let fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
        let location = `${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.country} `;
        return (
          [
            fullName || "--",
            user.email || "--",
            location || "--",
          user.uuid || "--"
          ]
        )
      }
    return (
        <div className='table-container'>
            <TableTitles titleNameArr={titleNameArr} />
            {users.map(user => <div key={uuidv4()}><TableRow keyName={user.uuid} user={user} userArr={getUserInfo4Table(user)} /></div>)}
        </div>
    )
}
export default UserTable