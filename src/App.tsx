import * as React from 'react';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
  <Provider store={store}>
    <Box className="App" sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <Header/>

      <Outlet />

      <Footer />
    </Box>
  </Provider>
  )
};

export default App;
