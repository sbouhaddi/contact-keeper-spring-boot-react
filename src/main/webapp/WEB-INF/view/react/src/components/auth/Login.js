import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import Alertcontext from '../../context/alert/alertContext';

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { setAlert } = useContext(Alertcontext);
  const { loginUser, error, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );
  const { email, password } = user;

  useEffect(() => {
    if (error === 'User not found') {
      setAlert(error, 'danger');
      clearErrors();
      setUser({
        email: '',
        password: '',
      });
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
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      loginUser(user);
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={handleOnSubmit}>
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
        <div>
          <button type='submit' className='btn btn-primary btn-block'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
