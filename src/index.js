import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';

import { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme';

import { nanoid } from 'nanoid';

import data from './data/contacts';

const contacts = data.map(contact => {
  contact.id = nanoid();
  return contact;
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App initialContacts={contacts} />
    </ThemeProvider>
  </React.StrictMode>
);
