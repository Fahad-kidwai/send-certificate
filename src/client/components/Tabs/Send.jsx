import React, { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '../ui/label';
import { serverFunctions } from '@/utils/serverFunctions';
import { useApp, AppContext } from '../../contexts';
import { useContext } from 'react';
// import { Input } from '../ui/input';

const Send = () => {
  const { info, updateInfo } = useContext(AppContext);
  const [isChecked, setIsChecked] = useState(info.addOn === 'true');

  const handleSwitchChange = (c) => {
    setIsChecked(c);
    updateInfo({ addOn: String(c) });
    serverFunctions.switchAddOn(c);
  };

  useEffect(() => {
    console.log('info.addon', info.addOn, typeof info.addOn);
    console.log('ischecked', isChecked, typeof isChecked);
    setIsChecked(info.addOn === 'true');
  }, [info.addOn]);

  return (
    <div className=" flex justify-evenly items-center py-2 bg-gray-200 ">
      {/* <h2 className="">SwAdd-On :</h2> */}
      <Label>Add-On On/Off</Label>
      <Switch
        checked={isChecked}
        className=" mx-2 bg-[#b4b4b7]"
        onCheckedChange={handleSwitchChange}
      />
    </div>
  );
};

export default Send;
