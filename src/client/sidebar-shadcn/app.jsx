import React from 'react';
import MyTabs from '@/components/Tabs/MyTabs';
import { AppProvider } from '../contexts';

export const App = () => {
  console.log("In app.js file")
  return (

      <div className=" overflow-hidden">
        <MyTabs  />
      </div>

  );
};
