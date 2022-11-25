import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./tableTitles.css"

const TableTitles = ({ titleNameArr }) => {

    return (
        <div className='table-title-container'>
            {
                titleNameArr.map(title => {
                    return <div className='table-title-column' key={uuidv4()}>{title}</div>
                })
            }
        </div>
    )
}
export default TableTitles