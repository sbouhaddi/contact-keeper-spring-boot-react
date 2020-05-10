import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  LOAD_CONTACTS,
  ADD_CONTACT,
  CONTACT_ERROR,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';

const ContactState = ({ children }) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //LOAD CONTACTS
  const loadContacts = async () => {
    try {
      const res = await axios.get(`api/getContacts`);
      dispatch({
        type: LOAD_CONTACTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data,
      });
    }
  };

  //ADD CONTACT
  const addContact = async (contact) => {
    try {
      const res = await axios.post(`api/contacts`, contact);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data,
      });
    }
  };

  //DELETE CONTACT
  const deleteContact = async (id) => {
    try {
      await axios.delete(`api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data,
      });
    }
  };

  //SET CURRENT
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  //CLEAR CURRENT
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  //UPDATE CONTACT
  const updateContact = async (contact) => {
    try {
      const res = await axios.put(`api/contacts`, contact);
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data,
      });
    }
  };

  //FILTER CONTACTS
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  //CLEAR FILTER
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  //CLEAR CONTACTS
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        loadContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
      }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
