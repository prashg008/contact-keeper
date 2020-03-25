import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Alert from './components/layouts/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contacts/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/privateRoute';
import './App.css';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AlertState>
      <AuthState>
        <ContactState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alert />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ContactState>
      </AuthState>
    </AlertState>
  );
};

export default App;
