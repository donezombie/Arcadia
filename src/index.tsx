import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "theme/createEmotionCache";
import { QueryClientProvider, QueryClient } from "react-query";
import { theme } from "theme";

import App from "./App";
import store from "./redux/store";
import i18n from "./i18n";
import reportWebVitals from "./reportWebVitals";

const cache = createEmotionCache();
const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <CssBaseline />
            <App />
          </Provider>
        </I18nextProvider>
      </ThemeProvider>
    </CacheProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
