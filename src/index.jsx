import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import i18n from 'i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'theme/createEmotionCache';
import { ApolloProvider } from '@apollo/client';
import { QueryClientProvider, QueryClient } from 'react-query';

import App from './App';
import './index.css';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';
import { theme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';

import apolloServices from 'services/apolloServices';

const cache = createEmotionCache();
const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <ApolloProvider client={apolloServices.client}>
              <CssBaseline />
              <App />
            </ApolloProvider>
          </Provider>
        </I18nextProvider>
      </ThemeProvider>
    </CacheProvider>
  </QueryClientProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
