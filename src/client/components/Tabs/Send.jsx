import React, { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '../ui/label';
import { serverFunctions } from '@/utils/serverFunctions';
import { useApp, AppContext } from '../../contexts';
import { useContext } from 'react';
// import { Input } from '../ui/input';

const Send = () => {
  const { info, updateInfo } = useContext(AppContext);
  const [isChecked, setIsChecked] = useState(info.addOn == 'true');

  const handleSwitchChange = (c) => {
    setIsChecked(c);
    updateInfo({ addOn: c });
    serverFunctions.switchAddOn(c);
  };

  useEffect(() => {
    setIsChecked(info.addOn);
  }, [info.addOn]);

  return (
    <div className=" flex justify-evenly items-center py-2 rounded-md mt-1 bg-gray-200 ">
      {/* <h2 className="">SwAdd-On :</h2> */}
      <Label>Add-On On/Off</Label>
      <Switch
        checked={isChecked}
        className=" mx-2"
        onCheckedChange={handleSwitchChange}
      />
    </div>
  );
};

export default Send;
