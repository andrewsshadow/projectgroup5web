import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import GuestItem from '../guests/GuestItem'
import GuestContext from '../../context/guestContext/guestContext'
import AuthContext from '../../context/authContext/authContext'
import '../../styles/GuestsList.css'



const GuestsList = () => {

  const context = useContext(GuestContext)
  const { loading } = useContext(AuthContext)
  const { guests, guestFilter, searchGuest, getGuests } = context
  useEffect(() => {
    getGuests();
  }, []);

  if (guests === null || guests.length === 0) {
    return <h3 className="no-guest">{loading ? 'Loading guests...' : 'Please add a guest'}</h3>
  }

  return (
    <div className='main--div-guests'>
      <TransitionGroup className="guests">
        {searchGuest !== null ? searchGuest.map(guest => (
          <CSSTransition key={guest._id} timeout={300}
            classNames='item' >
            <GuestItem guest={guest} />
          </CSSTransition>)) :
          guests.filter(guest => !guestFilter || guest.isconfirmed).map(guest => (<CSSTransition key={guest._id} timeout={300}
            classNames='item'>
            <GuestItem guest={guest} />
          </CSSTransition>)
          )}
      </TransitionGroup>
    </div>
  )
}
export default GuestsList
