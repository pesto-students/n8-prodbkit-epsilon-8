import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import reportWebVitals from './reportWebVitals';
import store from './store';

import App from './App';

import 'antd/dist/antd.css';
import './index.scss';

Sentry.init({
  dsn: 'https://1b606f2f97604e91aa2ec41bf69d9646@o1030414.ingest.sentry.io/5997677',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
