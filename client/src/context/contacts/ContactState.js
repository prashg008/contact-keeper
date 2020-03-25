import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import ContactRecucer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACT,
  CLEAR_CONTACT
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispach] = useReducer(ContactRecucer, initialState);

  const getContact = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispach({ type: GET_CONTACT, payload: res.data });
    } catch (err) {
      dispach({ type: CONTACT_ERROR, payload: err.response.mes });
    }
  };

  //  ADD Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispach({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispach({ type: CONTACT_ERROR, payload: err.response.mes });
    }
  };
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispach({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispach({ type: CONTACT_ERROR, payload: err.response.mes });
    }
  };
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispach({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispach({ type: CONTACT_ERROR, payload: err.response.mes });
    }
  };
  //  Delete Contact
  const clearContacts = id => {
    dispach({ type: CLEAR_CONTACT, payload: id });
  };
  //  Set Current Contact
  const setCurrent = contact => {
    dispach({ type: SET_CURRENT, payload: contact });
  };
  //  Clear Current Contact
  const clearCurrent = () => {
    dispach({ type: CLEAR_CURRENT });
  };
  //  Update  Contact

  //  Filter Contact
  const filterContacts = text => {
    dispach({ type: FILTER_CONTACT, payload: text });
  };
  //  clear filter
  const clearFilter = () => {
    dispach({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContact,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
