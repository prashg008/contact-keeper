import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;

  const { registerUser, err, clearError, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (err != null) {
      setAlert(err, 'danger');
    }
    clearError();
    // eslint-disable-next-line
  }, [err, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('please Enter all fields', 'danger');
    } else if (password2 !== password) {
      setAlert('please Enter all fields', 'danger');
    } else {
      registerUser({ name, email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='texk-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-groups'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-groups'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-groups'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <div className='form-groups'>
          <label htmlFor='password2'>Confirm password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
