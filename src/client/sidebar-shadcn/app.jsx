import React from 'react';
import MyTabs from '@/components/Tabs/MyTabs';
import { Toaster } from '@/components/ui/sonner';

export const App = () => {
  console.log('In app.js file');
  return (
    <div>
      <div className=" overflow-hidden">
        {/* Context add */}
        <MyTabs />
      </div>
      <Toaster />
    </div>
  );
};
