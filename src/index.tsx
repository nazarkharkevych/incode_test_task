import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './styles.css';
import MainPage from './pages/MainPage/MainPage';

const LazyDetails = React.lazy(() => import('./pages/DetailsPage/DetailsPage'));

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route path=":id" element={
          <React.Suspense fallback={<>Loading...</>}>
            <LazyDetails />
          </React.Suspense>
        } />
      </Route>
    </Routes>
  </Router>
);
