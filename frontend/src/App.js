import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './navigation/Routes';
import store from './redux/setup/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Routes />
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
