import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider, createTheme } from '@mantine/core';
import { store } from './redux/store.js';
import App from './components/App.jsx';
import '@mantine/core/styles.css';
import './index.css';

const theme = createTheme({
  cursorType: 'pointer',
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);
