import React, { useState, useContext, useEffect } from 'react';
import Alertcontext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const { setAlert } = useContext(Alertcontext);
  const { registerUser, error, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (error === 'User alrady exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (isAuthenticated) {
      props.history.push('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated, props.history]);

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser(user);
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={handleOnSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleOnChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={handleOnChange}
            required
            minLength='6'
          />
        </div>
        <div>
          <button type='submit' className='btn btn-primary btn-block'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
