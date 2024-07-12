import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import  Send  from './Send';
import Mail from './Mail';
import Certificate from './Certificate';
import Record from './Record';
import { serverFunctions } from '@/utils/serverFunctions';
import { AppProvider } from '../../contexts';

const MyTabs = () => {
  const [info, setInfo] = useState({});

  const getInfo = async () => {
    const properties = await serverFunctions.getAllProperties();
    setInfo(properties);
  };

  const updateInfo = (prop) => {
    setInfo((prev) => ({ ...prev, ...prop }));
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <AppProvider value={{ info, getInfo, updateInfo }}>
      {/* <div className="overflow-hidden pb-4"> */}
      <Tabs defaultValue="mail" className=" ">
        <TabsList className=" w-full flex justify-around rounded-none">
          {/* <TabsTrigger value="send">Send</TabsTrigger> */}
          <TabsTrigger value="mail">Mail</TabsTrigger>
          <TabsTrigger value="certificate">Certificate</TabsTrigger>
          {/* <TabsTrigger value="records">Records</TabsTrigger> */}
        </TabsList>
        {/* <TabsContent value="send" className=" px-4 ">
          <Send />
        </TabsContent> */}
        <TabsContent value="mail" className="px-4  m-0">
          <Send />
          <Mail />
        </TabsContent>
        <TabsContent value="certificate" className="px-4 m-0">
          <Send />
          <Certificate />
        </TabsContent>
        <TabsContent value="records" className=" px-4 ">
          <Record />
        </TabsContent>
      </Tabs>
      {/* </div> */}
    </AppProvider>
  );
};

export default MyTabs;
