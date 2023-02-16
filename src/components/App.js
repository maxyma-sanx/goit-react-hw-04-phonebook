import { Component } from 'react';

import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { Wrapper } from './Wrapper';
import { GlobalStyle } from './GlobalStyle';

import { Section } from './Section';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Social } from './Social';

export class App extends Component {
  static defaultProps = {
    initialContacts: [],
  };

  static propTypes = {
    initialContacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    const { initialContacts } = this.props;

    localContacts
      ? this.setState({ contacts: localContacts })
      : this.setState({ contacts: initialContacts });
  }

  addContact = (name, number) => {
    const currentName = this.state.contacts.find(item => item.name === name);

    if (currentName && name === currentName.name) {
      alert(`${name} is already exist!`);
      return;
    }

    this.setState(prevState => ({
      contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
    }));
  };

  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedCaseContacts = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedCaseContacts)
    );
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = this.getFilteredContacts();

    return (
      <Wrapper>
        <Section title="Add contact" headerContent={<Social />}>
          <ContactForm onSubmit={this.addContact} />
        </Section>
        {contacts.length > 0 && (
          <Section
            title="Contacts"
            headerContent={
              <Filter value={filter} onChange={this.changeFilter} />
            }
          >
            <ContactList
              contacts={filteredContacts}
              onRemove={this.removeContact}
            />
          </Section>
        )}

        <GlobalStyle />
      </Wrapper>
    );
  }
}
