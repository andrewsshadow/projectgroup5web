import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext'
import '../../styles/Navbar.css'

const Navbar = ({ title, icon }) => {
  const { user, logout, isAuthencated, clearErrors } = useContext(AuthContext)

  const onLogout = () => {
    logout()
    clearErrors()
  }
  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <span className="sm-hide">|</span>
      <li><a href='#!' onClick={onLogout}><span className="sm-hide">Logout</span> <i className="fas fa-sign-out-alt"></i></a></li>
    </Fragment>
  );

  return (
    <div className='navbar'>
      <div className="logo">
        <h1><i className={icon} /> {title} </h1>
      </div>
      <ul>
        {authLinks}
      </ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

// get icons for party horn and signout/signin
Navbar.defaultProps = {
  title: 'Party Planner',
  icon: 'fas fa-party-horn'
}

export default Navbar
