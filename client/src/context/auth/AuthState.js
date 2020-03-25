import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthRecucer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    err: null
  };
  const [state, dispach] = useReducer(AuthRecucer, initialState);

  //   load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispach({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispach({ type: AUTH_ERROR });
    }
  };

  //  Register user
  const registerUser = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispach({
        type: REGISTRATION_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispach({
        type: REGISTRATION_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //  login user
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispach({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispach({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //  logout
  const logout = () => {
    dispach({ type: LOGOUT });
  };
  //  clear error
  const clearError = () => {
    dispach({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        err: state.err,
        user: state.user,
        registerUser,
        clearError,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
