import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const text = useRef('');
  const { filterContacts, clearFilter, filtered } = useContext(ContactContext);

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const handleFilterContacts = (e) => {
    e.preventDefault();
    if (text.current.value !== null) {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts ...'
        onChange={handleFilterContacts}
      />
    </form>
  );
};

export default ContactFilter;
