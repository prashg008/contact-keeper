import React, { Fragment, useContext, useEffect } from 'react';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contacts/ContactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContact, loading } = contactContext;

  useEffect(() => {
    getContact();
  }, []);

  if (contacts !== null && !loading && contacts.length === 0) {
    return <h4>Please add contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Fragment>Loading....</Fragment>
      )}
    </Fragment>
  );
};

export default Contacts;
