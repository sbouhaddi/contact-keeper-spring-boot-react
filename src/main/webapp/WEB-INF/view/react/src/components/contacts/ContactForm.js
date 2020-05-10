import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { addContact, current, clearCurrent, updateContact } = useContext(
    ContactContext
  );

  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current]);

  const handleOnChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    handleClearContact();
  };

  const handleClearContact = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name...'
        name='name'
        value={name}
        onChange={handleOnChange}
      />
      <input
        type='text'
        placeholder='Email ...'
        name='email'
        value={email}
        onChange={handleOnChange}
      />
      <input
        type='text'
        placeholder='Phone ...'
        name='phone'
        value={phone}
        onChange={handleOnChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={handleOnChange}
      />
      Personal {''}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={handleOnChange}
      />
      Professional
      <div>
        <button className='btn btn-primary btn-block'>
          {current ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
      {current && (
        <div>
          <button
            className='btn btn-light btn-block'
            onClick={handleClearContact}>
            Clear Contact
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
