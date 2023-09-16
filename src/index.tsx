import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'mobx-react';
import './index.css';
import App from './App';
import store from "./mobx/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider {...store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);

