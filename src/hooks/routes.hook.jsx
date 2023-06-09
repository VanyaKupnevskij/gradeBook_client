import MainPage from '../pages/Main';
import ProfilePage from '../pages/Profile';
import ContactsPage from '../pages/Contacts';

import LinkPage from '../pages/Link';
import RecordsPage from '../pages/Records';

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

export function useRoutes(isAuthenticated, role) {
  return (
    <Routes>
      <Route index path="/" exact element={<MainPage />} />
      <Route path="/contacts" exact element={<ContactsPage />} />
      <Route path="/profile" exact element={<ProfilePage />} />

      {isAuthenticated &&
        (role === 'admin' ? (
          <Route path="/link" element={<LinkPage />} />
        ) : (
          <Route path="/marks" element={<RecordsPage />} />
        ))}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
