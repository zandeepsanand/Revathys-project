import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [enrolled, setEnrolled] = useState(false);
  const [userId, setUserId] = useState('65a82896510a2d45f3fbb58a');

  return (
    <AppContext.Provider value={{ enrolled, setEnrolled,userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};