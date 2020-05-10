import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

import setAuthToken from '../../utils/setAuthToken';

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //LOAD USER
  const loadUser = async () => {
    setAuthToken();

    try {
      const res = await axios.get(`api/authenticate`);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  //REGISTER USER
  const registerUser = async (user) => {
    try {
      const res = await axios.post(`/api/sign-up`, user);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data,
      });
    }
  };

  //LOGIN USER
  const loginUser = async (data) => {
    try {
      const res = await axios.post(`/api/login`, data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data,
      });
    }
  };

  //LOGOUT
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  //CLEAR ERROR
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        registerUser,
        clearErrors,
        loadUser,
        loginUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
