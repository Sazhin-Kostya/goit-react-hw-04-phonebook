import { useState, useEffect } from 'react';
import { ContactForm } from './Form/Form';
import { nanoid } from 'nanoid';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { FormTitle, Container } from '../components/Form/Form.styled';
import { GlobalStyle } from './GlobalStyle';
export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    const doubleContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (doubleContact) {
      window.alert(`Contact with name '${newContact.name}' already exists!`);
      return;
    }
    const newName = {
      id: nanoid(),
      name: newContact.name,
      number: newContact.number,
    };
    setContacts(prevContacts => [...prevContacts, newName]);
  };
  const deleteContact = contactID => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactID)
    );
  };

  const changeFilter = newFilter => {
    setFilter(newFilter);
  };

  useEffect(() => {
    const contactsStart = localStorage.getItem('Contact');
    if (contactsStart !== null) {
      setContacts(JSON.parse(contactsStart));
    }
  }, []);

  // componentDidMount() {
  //   const contactsStart = localStorage.getItem('Contact');
  //   if (contactsStart !== null) {
  //     const parseContacts = JSON.parse(contactsStart);
  //     this.setState({
  //       contacts: parseContacts,
  //     });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('Contact', JSON.stringify(this.state.contacts));
  //   }
  // }

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('Contact', JSON.stringify(contacts));
    }
  }, [contacts]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <Container>
      <FormTitle>Phonebook</FormTitle>
      <ContactForm newContact={addContact} />
      <FormTitle>Contacts</FormTitle>
      <Filter changeFilter={changeFilter} value={filter} />
      <Contacts contacts={filteredContacts} deleteContact={deleteContact} />
      <GlobalStyle />
    </Container>
  );
};
