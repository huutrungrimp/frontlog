import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { createContext } from 'react';
import { DataProvider } from './features/assets/dataProvider';
import { variables } from './features/assets/variables';
import { AppContextProps } from './interface';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const user = localStorage.getItem('userDetail');
const existingUser = (user === null ? "" : (JSON.parse(localStorage.getItem('userDetail') || '')));
console.log(existingUser.username)

const data:AppContextProps = {
  username: existingUser?.username,
  urlbase: variables.urlbase,
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <DataProvider value={data}>
          <App />
        </DataProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);