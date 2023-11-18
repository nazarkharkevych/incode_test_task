import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './styles.css';
import Main from './pages/Main/Main';
import Details from './pages/Details/Details';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path=":id" element={<Details />} />
      </Route>
    </Routes>
  </Router>
);
