import React from 'react';
import LandingPage from './LandingPage';
import { NotificationProvider } from './components/NotificationContext';

const App = () => {
  return (
   <div>
    <NotificationProvider>
    <LandingPage/>
    </NotificationProvider>
   </div>
  );
};

export default App;
