import React, { useReducer } from 'react'
import axios from 'axios'
import GuestContext from './guestContext';
import guestReducer from './guestReducer';
import {
  TOGGLE_GUESTFILTER,
  SEARCH_GUEST,
  CLEAR_SEARCH,
  REMOVE_GUEST,
  ADD_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT,
  UPDATE_GUEST,
  GET_GUESTS,
  GUESTS_ERROR,
  CLEAR_GUESTS
} from '../types'

const GuestState = (props) => {
  const intialState = {
    guestFilter: false,
    searchGuest: null,
    editGuest: null,
    guests: [],
    error: null,
  }
  const [state, dispatch] = useReducer(guestReducer, intialState)

  // get guests
  const getGuests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/guests', {headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
      }})
      dispatch({
        type: GET_GUESTS,
        payload: res.data
      })
    } catch (e) {
      dispatch({
        type: GUESTS_ERROR,
        payload: e.response.msg
      })
    }
  }

  // Add Guest 

  const addGuest = async (guest) => {
    const config = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:3000"
    }
    try {
      const res = await axios.post('http://localhost:5000/guests', guest, config)
      dispatch({
        type: ADD_GUEST,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: GUESTS_ERROR,
        payload: error.response.msg
      })
    }
  }


  // remove guest 
  const removeGuest = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/guests/${id}`)
      dispatch({
        type: REMOVE_GUEST,
        payload: id
      })
    } catch (e) {
      dispatch({
        type: GUESTS_ERROR,
        payload: e.response.msg
      })
    }
  }

  // update guest

  const update_Guest = async (guest) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http://localhost:3000"
      }
    }
    try {
      const res = await axios.put(`http://localhost:5000/guests/${guest._id}`, guest, config)
      dispatch({
        type: UPDATE_GUEST,
        payload: res.data
      })
      getGuests()

    } catch (error) {
      dispatch({
        type: GUESTS_ERROR,
        payload: error.response
      })
    }
  }

  //toggle isconfirmed
  const toggleGuestFilter = () => {
    dispatch({
      type: TOGGLE_GUESTFILTER
    })
  }

  // Search Guest
  const search_Guest = (guest) => {
    dispatch({
      type: SEARCH_GUEST,
      payload: guest
    })
  }
  const clearSearchGuest = () => {
    dispatch({
      type: CLEAR_SEARCH
    })
  }

  // Edit Guest 
  const edit_Guest = (guest) => {
    dispatch({
      type: EDIT_GUEST,
      payload: guest
    })
  }
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    })
  }
  const clearGuests = () => {
    dispatch({
      type: CLEAR_GUESTS
    })
  }
  return (
    <GuestContext.Provider value={{
      guests: state.guests,
      guestFilter: state.guestFilter,
      searchGuest: state.searchGuest,
      editGuest: state.editGuest,
      error: state.error,
      loading: state.loading,
      addGuest,
      removeGuest,
      edit_Guest,
      clearEdit,
      update_Guest,
      toggleGuestFilter,
      search_Guest,
      clearSearchGuest,
      getGuests,
      clearGuests
    }} >
      {props.children}
    </GuestContext.Provider >
  )
}

export default GuestState
