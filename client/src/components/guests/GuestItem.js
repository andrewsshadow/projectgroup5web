import React, { useContext } from 'react'
import GuestContext from '../../context/guestContext/guestContext'
import '../../styles/GuestItem.css'

const GuestItem = ({ guest }) => {
  const { removeGuest, edit_Guest, clearEdit, update_Guest } = useContext(GuestContext)
  const { _id, name, phone, diet, isconfirmed } = guest

  const handleRemove = () => {
    removeGuest(_id)
    clearEdit()
  }
  const onchange = () => {
    update_Guest({ ...guest, isconfirmed: !isconfirmed })
  }

  return (
    <div className="guest-card">
      <div className="card-head">
        <div >
          <label className={`${isconfirmed && 'confirm'}`}>Confirmed?
            <i className={`fa-solid fa-square-check ${isconfirmed && 'confirm'}`}><input type="checkbox" onChange={onchange} /> </i>
          </label>
        </div>
        <div>
          <button title="Edit Guest"><i className="fa-solid fa-pen-to-square" onClick={() => edit_Guest(guest)} ></i></button>
          <button onClick={handleRemove} title="Remove Guest"><i className="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <span className={'badge ' + (diet === 'Vegan' ? 'light--blue' : diet === 'Non-Veg' ? 'dark--blue' : 'dark--orange')}>{diet}</span>
        <div className="contact">
            <i class="fa-solid fa-mobile"></i>
            <p>{phone}</p>
        </div>
      </div>
    </div>
  )
}

export default GuestItem
