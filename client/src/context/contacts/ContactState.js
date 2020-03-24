import React, { useReducer } from "react";

import { v4 as uuid } from "uuid";
import ContactContext from "./ContactContext";
import ContactRecucer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "jill",
        email: "jill@gmail.com",
        phone: "987-789-7894",
        type: "personal"
      },
      {
        id: 2,
        name: "jill-2",
        email: "jill@gmail.com",
        phone: "987-789-7894",
        type: "personal"
      },
      {
        id: 3,
        name: "jill-3",
        email: "jill@gmail.com",
        phone: "987-789-7894",
        type: "professional"
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispach] = useReducer(ContactRecucer, initialState);

  //  ADD Contact
  const addContact = contact => {
    contact.id = uuid();
    dispach({ type: ADD_CONTACT, payload: contact });
  };
  //  Delete Contact
  const deleteContact = id => {
    dispach({ type: DELETE_CONTACT, payload: id });
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
  const updateContact = contact => {
    dispach({ type: UPDATE_CONTACT, payload: contact });
  };
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
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
