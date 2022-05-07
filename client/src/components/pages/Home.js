import React, { useContext, useEffect } from 'react'
import GuestForm from '../guests/GuestForm'
import FilterGuest from '../guests/FilterGuest'
import SearchGuest from '../guests/SearchGuest'
import CountGuest from '../guests/CountGuest'
import GuestsList from '../guests/GuestsList'
import AuthContext from '../../context/authContext/authContext'
import '../../styles/Home.css'


const Home = () => {
  const { loadUser } = useContext(AuthContext)

  useEffect(() => {
    loadUser()
  }, [])
  return (
    <div className="app-container">
      <div className="main">

        <div className="filter">
          <FilterGuest />
          <SearchGuest />
        </div>

        <GuestForm />
        <CountGuest />

      </div>
      <GuestsList />

    </div>
  )
}
export default Home
