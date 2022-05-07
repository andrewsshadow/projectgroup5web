import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext'
import GuestContext from '../../context/guestContext/guestContext'
import '../../styles/Navbar.css'

const Navbar = ({ title, icon }) => {
  const { user, logout, isAuthencated, clearErrors } = useContext(AuthContext)
  const { clearGuests } = useContext(GuestContext)

  const onLogout = () => {
    logout()
    clearGuests()
    clearErrors()
  }
  const authLinks = (
    <>
      <li>Hello, {user && user.name}</li>
      <span className="sm-hide">|</span>
      <li><a href='#!' onClick={onLogout}><span className="sm-hide">Logout</span> <i className="fa-solid fa-right-from-bracket"></i></a></li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to='/register'>
            Register <i className="fa-solid fa-address-card"></i>
        </Link>
      </li>
      <span className="sm-hide">|</span>
      <li>
        <Link to='/login'>
            Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </Link>
      </li>
    </>
  );

  return (
    <div className='navbar'>
      <div className="logo">
        <li>
        <Link to='/'>
            <h1>
            <i className="fa-solid fa-martini-glass"></i> Party Planner
            </h1>
        </Link>
        </li>
      </div>
      <ul>
        {isAuthencated ? authLinks : guestLinks}
      </ul>
    </div>
  )
}

export default Navbar
