import React, { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '../ui/label'
import { serverFunctions } from '@/utils/serverFunctions'
import { useApp } from "../../contexts";


const Send = ({addOn}) => {
  const {info,updateInfo} = useApp()
  const [isChecked,setIsChecked] = useState(info.addOn === "true")
  useEffect(()=>{
    setIsChecked(info.addOn === "true")
  },[info.addOn])
  const handleSwitchChange = (c: boolean)=> {
    console.log(c)
    // setIsChecked(c)
    updateInfo({addOn: c})
    serverFunctions.switchAddOn(c)
  }
  return (
    <div className=''>
        <h2 className=''>Switch Add-On</h2>
        <Label>On/Off</Label>
        <Switch checked={isChecked} className=' mx-2' onCheckedChange={handleSwitchChange} />
    </div>
  )
}

export default Send