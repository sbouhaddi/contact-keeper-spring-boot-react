import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faPhone } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import contactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const { deleteContact, setCurrent, clearCurrent } = useContext(
    contactContext
  );

  const handleDeleteContact = () => {
    deleteContact(id);
    clearCurrent();
  };
  const { id, name, email, phone, type } = contact;

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}
        {''}
        <span
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
          style={{ float: 'right' }}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            {' '}
            <FontAwesomeIcon icon={faEnvelopeOpen} /> {email}
          </li>
        )}
        {phone && (
          <li>
            {' '}
            <FontAwesomeIcon icon={faPhone} /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={handleDeleteContact}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
