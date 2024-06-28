import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import  Send  from './Send';
import Mail from './Mail';
import Certificate from './Certificate';
import Record from './Record';
import { serverFunctions } from '@/utils/serverFunctions';

const MyTabs = () => {
  // const [isChecked,setIsChecked] = useState(true)
  const info = serverFunctions.getAllProperties()
  console.log(info?info:"not")

  return (
    <div className="overflow-hidden pb-4">
      <Tabs defaultValue="send" className="">
        <TabsList className=" w-full">
          <TabsTrigger value="send">Send</TabsTrigger>
          <TabsTrigger value="mail">Mail</TabsTrigger>
          <TabsTrigger value="certificate">Certificate</TabsTrigger>
          <TabsTrigger value="records">Records</TabsTrigger>
        </TabsList>
        <TabsContent value="send" className=' px-4 '>
          <Send />
        </TabsContent>
        <TabsContent value="mail" className=' px-4 '>
          <Mail />
        </TabsContent>
        <TabsContent value="certificate" className=' px-4 '>
          <Certificate />
        </TabsContent>
        <TabsContent value="records" className=' px-4 '>
          <Record />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTabs;
