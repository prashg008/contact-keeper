import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AlertContext from './AlertContext';
import AlertRecucer from './AlertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = [];
  const [state, dispach] = useReducer(AlertRecucer, initialState);

  //   set Alert

  const setAlert = (msg, type) => {
    const id = uuid();
    dispach({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispach({ type: REMOVE_ALERT, payload: id }), 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
