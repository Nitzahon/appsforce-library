import React, { useEffect } from 'react'


const TextInput = ({ label, id, handleInput, value, error, editMode, maxLngh, name, reqMark, salary, disabled }) => {
    useEffect(() => {
        if (id && value) {
            handleInput(id, value)
        }
    }, [])
    //if salary, and value is a valid number display on input as number with commas, while sending correct format to handleInput
    //AND keep cursor position in the right place when changing value. TODO minimize code

    return (
        <div className={`input-container`}>
            <label className='cover-font-regular m-0'>{<span style={{ color: "red" }}>{reqMark}</span>} {label}</label>
            <div className={`account-textbox-general ${editMode && 'bk-greyOut'}`}>
                <input name={name} type="text" className={`bk-clear`} maxLength={maxLngh} id={id} onChange={(e) => { handleInput(id, e.target.value) }} defaultValue={(salary && value) ? value.toLocaleString() : value} disabled={editMode} />
            </div>
            <label className='modal-error-message m-0'>{error}</label>
        </div>
    )
}

export default TextInput