import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;

  const { login, err, clearError, isAuthenticated } = authContext;

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
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.type]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='texk-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
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
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
