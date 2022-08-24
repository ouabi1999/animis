import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from "./app/store"
import App from './App';
import "./App.css"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Fragment>
        <App />
      </Fragment>
      </Provider>
  </React.StrictMode>, document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

