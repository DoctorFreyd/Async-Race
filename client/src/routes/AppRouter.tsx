import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GaragePage from '../features/garage/GaragePage';
import WinnersPage from '../features/winners/WinnersPage';
import Layout from '../layout/Layout';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="garage" replace />} />
          <Route path="/garage" element={<GaragePage />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route
            path="/*"
            element={
              <h1 className="text-3xl font-bold underline text-red-500">404 — Page Not Found</h1>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
