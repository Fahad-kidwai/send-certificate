import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import  Send  from './Send';
import Mail from './Mail';
import Certificate from './Certificate';
import Record from './Record';
import { serverFunctions } from '@/utils/serverFunctions';
import { AppProvider } from '../../contexts';
// import { TagsDialog } from '../TagsDialog';

const MyTabs = () => {
  // const [info, setInfo] = useState<Record<string, any>>({})
  // useEffect(() => {
  //   const fetchInfo =  async ()=> {
  //     const properties = await serverFunctions.getAllProperties()
  //     console.log("info in myTabs",properties)
  //     setInfo(properties)
  //     console.log(info)
  //   }
  //   fetchInfo()
  //   console.log("info in myTabs 1",info)
  // }, [])

  const [info, setInfo] = useState({});

  const getInfo = async () => {
    const properties = await serverFunctions.getAllProperties();
    console.log('info in App', properties);
    setInfo(properties);
  };

  const updateInfo = (prop) => {
    console.log("prop", prop)
    setInfo((prev) => ({...prev,...prop}))
  }

  useEffect(()=> {
    getInfo()
  },[])

  return (
    <AppProvider value={{ info, getInfo,updateInfo }}>
    <div className="overflow-hidden pb-4">
      <Tabs defaultValue="send" className="">
        <TabsList className=" w-full">
          <TabsTrigger value="send">Send</TabsTrigger>
          <TabsTrigger value="mail">Mail</TabsTrigger>
          <TabsTrigger value="certificate">Certificate</TabsTrigger>
          {/* <TabsTrigger value="records">Records</TabsTrigger> */}
        </TabsList>
        <TabsContent value="send" className=' px-4 '>
          <Send  />
        </TabsContent>
        <TabsContent value="mail" className=' px-4 '>
          <Mail />
        </TabsContent>
        <TabsContent value="certificate" className=' px-4 '>
          <Certificate  />
        </TabsContent>
        {/* <TabsContent value="records" className=' px-4 '>
          <TagsDialog />
        </TabsContent> */}
      </Tabs>
    </div>
    </AppProvider>
  );
};

export default MyTabs;
