import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import  Send  from './Send';
import Mail from './Mail';
import Certificate from './Certificate';
import { serverFunctions } from '@/utils/serverFunctions';
import { AppProvider } from '../../contexts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyTabs = () => {
  const [info, setInfo] = useState({});

  const getInfo = async () => {
    const properties = await serverFunctions.getAllProperties();
    if (properties) setInfo(properties);
  };

  const updateInfo = (prop) => {
    setInfo((prev) => ({ ...prev, ...prop }));
  };

  const toastContainerStyle = {
    width: '270px',
    height: '30px',
    // Adjust margins as desired
    // Add other styles as needed (e.g., font-size, color)
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <AppProvider value={{ info, getInfo, updateInfo }}>
      <Send />
      <Tabs defaultValue="certificate" className=" mt-1">
        <TabsList className=" w-full flex justify-around rounded-none">
          <TabsTrigger value="certificate">Certificate</TabsTrigger>
          <TabsTrigger value="mail">Mail</TabsTrigger>
        </TabsList>
        <TabsContent value="certificate" className="px-4 m-0">
          <Certificate />
        </TabsContent>
        <TabsContent value="mail" className="px-4  m-0">
          <Mail />
        </TabsContent>
      </Tabs>
      <ToastContainer
        hideProgressBar={true}
        position="top-right"
        style={toastContainerStyle}
      />
    </AppProvider>
  );
};

export default MyTabs;
